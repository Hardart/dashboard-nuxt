<script setup lang="ts">
interface NewTag {
  label: string
}
const tags = defineModel<(string | NewTag)[]>({ required: true })
const options = defineModel<string[]>('options', { required: true })

const updatedTags = computed({
  get: () => tags.value,
  set: (items) => {
    const res = items.map((tag) => {
      // if (typeof tag === 'string' && options.value.includes(tag)) return tag
      if (typeof tag === 'object' && 'label' in tag) {
        options.value.push(tag.label)
        return tag.label
      }

      return tag
    })

    tags.value = res
  }
})
</script>

<template>
  <UFormGroup label="Теги" name="tags" class="w-1/6 min-w-48">
    <USelectMenu
      v-model="updatedTags"
      :options="options"
      creatable
      multiple
      searchable
      placeholder="Выбрать место отображения"
      searchablePlaceholder="Поиск..."
    />
  </UFormGroup>
</template>

<style></style>
