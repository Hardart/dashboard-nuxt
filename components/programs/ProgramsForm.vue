<script setup lang="ts">
import type { Program } from '~/scheme/z_program'
import type { User } from '~/scheme/z_user'
const { selectedWeekdayIds, isTimeEqual, scheduleInfoState, selectedIdsToWeekday, setScheduleTimeString } = useSchedule()
const scheduleModalState = defineModel({ required: true })
defineEmits(['open-schedule-modal'])
defineProps<{
  hosts: User[]
}>()

const addProgram = inject<() => void>('add-program')
if (typeof addProgram === 'undefined') throw createError("can't inject add function")

const programFormData = inject<Ref<Program>>('program-form-data')
if (!programFormData) throw createError('programFormData is undefined')
</script>

<template>
  <div class="w-auto max-w-2xl flex-grow divide-y divide-zinc-700">
    <div class="flex gap-6">
      <div class="flex-grow">
        <UFormGroup label="Название программы" class="flex-grow" required>
          <UInput v-model="programFormData.title" />
        </UFormGroup>
        <ProgramsFormHostSelect :hosts v-model="programFormData.hosts" />
        <UButton label="Добавить расписание" @click="$emit('open-schedule-modal')" class="mt-8" />
        <ul>
          <li v-for="schedule in programFormData.schedule" class="border-primary relative my-2 rounded-lg border-2 p-2">
            <h4>{{ selectedIdsToWeekday(schedule.weekdayIds) }}</h4>
            <ul class="flex gap-2">
              <li v-for="info in schedule.properties" class="relative mt-1">
                <p class="border-primary/60 rounded-lg border px-3 py-2 text-sm leading-3">
                  {{ setScheduleTimeString(info) }}
                </p>
                <div v-if="info.isReplay" class="absolute -top-1.5 right-2 text-xs">п</div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div class="">
        <UiImage size="size-32" v-model="programFormData.image" />
      </div>
    </div>

    <div class="mt-6 py-6 text-right">
      <UButton label="Добавить программу" @click="addProgram()" />
    </div>

    <UModal v-model="scheduleModalState" :ui="{ base: 'lg:w-[900px] sm:max-w-none' }">
      <ScheduleCard v-model:ids="selectedWeekdayIds" v-model:time="isTimeEqual" v-model:info="scheduleInfoState" />
    </UModal>
  </div>
</template>
