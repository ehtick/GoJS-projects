<script lang="ts">
  import go from 'gojs';
  import type { NodeData } from '$lib/types';
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';

  interface Props {
    selection: string | null;
    model: go.GraphLinksModel;
  }

  let { selection, model }: Props = $props();

  let selectedData = writable<go.ObjectData | null>(null);

  const inputClass =
    'w-full rounded-md border border-fp-border dark:border-fp-bg/20 bg-transparent pl-1.5 text-inherit focus:border-sky-600 focus:outline-none disabled:bg-black/[0.08] dark:focus:border-sky-300 dark:disabled:bg-white/[0.08]';

  let selectionEntries = $derived.by(() => {
    if ($selectedData !== null) {
      return Object.entries($selectedData);
    } else {
      return [];
    }
  });

  // update model data property
  function propertyChanged(event: Event, data: go.ObjectData, prop: string) {
    if (!model) return;

    model.commit(() => {
      model.setDataProperty(data, prop, (event?.target as HTMLInputElement).value);
    }, 'infoChange');
  }

  // update model data of an element in an array
  function propertyChangedArray(event: Event, data: go.ObjectData, prop: string, index: number) {
    if (!model) return;

    model.commit(() => {
      const newVal = (event?.target as HTMLInputElement).value;
      const arr = [...data[prop]];
      arr[index] = typeof arr[index] == 'number' ? parseFloat(newVal) : newVal;

      model.setDataProperty(data, prop, arr);
    }, 'infoChange');
  }

  onMount(() => {
    // console.log(model);
    const listenProps = new Set([
      'loc',
      'size',
      'color',
      'nodeDataArray',
      'FinishedUndo',
      'FinishedRedo'
    ]);

    model?.addChangedListener((e: go.ChangedEvent) => {
      const prop = e.propertyName as string;
      const data = e.object as NodeData;
      if (!listenProps.has(prop) || !data) return;

      if (selection) {
        selectedData.set(model.findNodeDataForKey(selection) ?? {});
      }
    });
  });

  $effect(() => {
    if (!selection) selectedData.set(null);
    else selectedData.set(model.findNodeDataForKey(selection));
  });
</script>

<div class="flex h-full flex-col rounded">
  <div
    class="rounded-t border-b border-fp-border bg-fp-bg px-1 py-2 text-center text-md font-semibold text-fp-light-accent dark:border-gray-700 dark:bg-fp-bg-dark dark:text-white"
  >
    Selected Node Information
  </div>

  <div class="mx-2 sm:mx-0 md:mx-2 mt-3">
    <div class="mx-2 grid grid-flow-row grid-cols-[auto_1fr] gap-x-2 sm:gap-x-1 md:gap-x-2 gap-y-5 text-sm text-fp-light-accent dark:text-white">
      {#each selectionEntries as [key, value]}
        {#if key == 'color'}
          <div>{key}</div>
          <input
            class={inputClass}
            {value}
            onchange={event => propertyChanged(event, $selectedData!, key)}
          />
        {:else if Array.isArray(value) && value?.length >= 3}
          <div>{key}</div>
          <div class="flex flex-wrap gap-1">
            {#each value as v, i}
              <div class="flex items-center w-full">
                {['X', 'Y', 'Z'][i]}
                <input
                  class={`${inputClass} ml-1 min-w-[30px]`}
                  value={v}
                  onchange={event => propertyChangedArray(event, $selectedData!, key, i)}
                />
              </div>
            {/each}
          </div>
        {:else}
          <div>{key}</div>
          <input class={inputClass} disabled {value} />
        {/if}
      {/each}
    </div>
  </div>
</div>
