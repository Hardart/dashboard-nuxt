<script setup lang="ts">
import { PROGRAM_STATE } from '~/enums/programsEnum'
import { SCHEDULE_STATE } from '~/enums/scheduleEnum'
import type { Program } from '~/scheme/z_program'
import type { User } from '~/scheme/z_user'
const { isOpenScheduleModal } = useSchedule()

defineProps<{ hosts: User[], loading: boolean, isEdit?: boolean }>()
const programFormData = tryInject<Program>(PROGRAM_STATE.FORM_DATA)
const saveProgram = tryInject<(p: Program) => void>(PROGRAM_STATE.SAVE)
const addSchedule = tryInject<VoidFunction>(SCHEDULE_STATE.ADD)
defineEmits(['open-schedule-modal', 'on-add-program'])
</script>

<template>
  <div class="w-auto max-w-2xl flex-grow divide-y divide-zinc-700">
    <div class="flex gap-6">
      <div class="flex-grow">
        <div class="space-y-4">
          <ProgramsFormProgramTitle v-model="programFormData.title" />
          <div class="flex justify-between">
            <ProgramsFormHostSelect :hosts v-model="programFormData.hosts" />
            <FormSelectColor v-model="programFormData.color" label="Выбрать цвет" name="color"/>
            <ProgramsFormIsPublished v-model="programFormData.isPublished" />
          </div>
        </div>
        <UButton label="Добавить расписание" @click="addSchedule" class="mb-2 mt-8" />
        <ul>
          <ProgramsFormScheduleItem v-for="(schedule, idx) in programFormData.schedule" :schedule :idx />
        </ul>
      </div>
      <div class="">
        <UiImage size="size-32" v-model="programFormData.image" />
      </div> 
    </div>
    <div class="pt-4 mt-2">
      <Editor v-model="programFormData.description" class="min-h-[200px]" label="Описание" name="description" />
    </div>
    <div class="mt-6 py-6 flex justify-end gap-3">
      <UButton type="button" label="Назад" color="gray" variant="ghost" @click="navigateTo('/programs')" />
      <UButton v-if="isEdit" label="Изменить" :loading />
      <UButton v-else label="Сохранить" :loading @click="saveProgram(programFormData)" />
    </div>

    <UModal
      v-model="isOpenScheduleModal"
      :ui="{
        base: 'lg:w-[900px] sm:max-w-none h-full flex-grow',
        container: 'flex flex-col min-h-full items-end sm:items-start justify-start ml-12 text-center'
      }"
      prevent-close
    >
      <ScheduleCard />
    </UModal>
  </div>
</template>
