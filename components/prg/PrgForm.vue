<script setup lang="ts">
import '~/utils/Array-extensions'
defineProps<{
  programForm: NewProgram
  scheduleProps: any
  isEdit: boolean
}>()
defineEmits(['new', 'append'])

const selectedIdsToWeekday = (array: number[]) => {
  switch (true) {
    case array.length == 7:
      return 'Каждый день'
    case array.length == 5 && array[0] === 1 && array[4] === 5:
      return 'По будням'
    case array.length == 2 && array.includes(6) && array.includes(7):
      return 'По выходным'
    default:
      return (
        'по ' +
        array
          .map((n) => getDeclension(n, 2, true))
          .capitalizeWords()
          .join(', ')
      )
  }
}
</script>

<template>
  <div class="w-auto max-w-4xl flex-grow space-y-4 divide-y divide-zinc-700">
    <UCard class="relative">
      <UButton
        class="absolute -bottom-3.5 right-4"
        icon="heroicons:clock-20-solid"
        color="emerald"
        label="добавить расписание"
        variant="outline"
        size="2xs"
        @click="$emit('new')"
      />

      <div class="flex gap-3">
        <div class="flex-grow space-y-2">
          <FormText v-model="programForm.title" label="Название программы" />
          <div class="flex gap-3">
            <UiColorPicker v-model="programForm.color" />
            <FormSwitch v-model="programForm.isPublished" label="Опубликовано" class="text-center" />
          </div>
        </div>
        <UiImage v-model="programForm.imageUrl" name="programs" />
      </div>
      <ul class="mt-8 space-y-8">
        <li v-for="(schedule, idx) in programForm.shedules" class="relative">
          <UCard>
            <SchActionBtns :props="scheduleProps" :idx :schedule />
            <div class="absolute -top-3 left-3 mb-3 flex items-center gap-6 bg-zinc-900 px-1.5">
              <p class="text-sm">{{ selectedIdsToWeekday(schedule.dayOfWeekIds) }}</p>
            </div>
            <div class="flex gap-8">
              <UiTimePicker v-model:start="schedule.startTime" />
              <UiDurationPicker v-model="schedule.duration" />
              <UiRepeatToggle v-model="schedule.isRepeat" />
            </div>
          </UCard>
        </li>
      </ul>
    </UCard>

    <UButton
      :label="isEdit ? 'Изменить' : 'Сохранить'"
      @click="$emit('append')"
      :disabled="!programForm.shedules.length || programForm.title.trim() == ''"
    />
  </div>
</template>
