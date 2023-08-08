import { ref, type Ref, type UnwrapRef } from 'vue'

export function useFetch<JSON = {}>(url: string): Ref<UnwrapRef<JSON> | null> {
  const data = ref<JSON | null>(null)

  fetch(url)
    .then((res) => res.json())
    .then((json) => {
      return (data.value = json.data)
    })
    .catch((err) => console.log(err))

  return data
}
