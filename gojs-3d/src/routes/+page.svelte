<script lang="ts">
  import MetaTags from '$lib/components/MetaTags.svelte';
  import DiagramSet from '$lib/components/DiagramSet.svelte';
  import NodeInfo from '$lib/components/NodeInfo.svelte';
  import ThemeToggle from '$lib/components/ThemeToggle.svelte';

  let selection: string | null = null;
  let model: go.GraphLinksModel;
</script>

<MetaTags
  title="GoJS alongside 3D (with Svelte) | GoJS Diagramming Library"
  description="GoJS and ThreeJS integration demo with synchronized 2D diagrams and a 3D model in Svelte. Three Diagrams are synchronized with the 3d view using one Model. Each of the 3 diagrams represents one of the 3d plane views (top down, side, front)."
  projectTitle="gojs-3d"
  screenshot="3d.png"
/>

<div class="mx-3 flex flex-col bg-fp-beige sm:h-full sm:overflow-hidden dark:bg-fp-bg-darkened">
  <div
    class="relative z-10 pt-4 pb-2 sm:py-0 sm:mt-1 mb-1 -mx-3 sm:mx-0 sm:rounded border-b sm:border border-fp-border bg-fp-bg dark:border-gray-700 dark:bg-gradient-to-t dark:from-fp-bg-dark dark:to-fp-bg-darkened"
  >
    <div aria-hidden="true" class="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded">
      <div class="absolute inset-0 transform-gpu blur-3xl">
        <div
          style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
          class="absolute top-1/2 left-1/2 aspect-1155/678 w-200 -translate-x-1/2 -translate-y-1/2 bg-linear-to-tr from-cyan-400 to-sky-800 opacity-15 dark:opacity-40 sm:w-288.75"
        ></div>
      </div>
    </div>
    <h1 class="max-w-3/4 sm:max-w-none mx-auto sm:mx-0 py-2 text-3xl font-bold text-fp-light-accent dark:text-white">
      GoJS alongside 3D (with Svelte)
    </h1>
    <div class="absolute top-10 sm:top-2 right-5 sm:right-2 z-20">
      <ThemeToggle />
    </div>
  </div>

  <div class="flex min-h-0 grow flex-col items-stretch">
    <!-- top, min-height to prevent diagram scroll bars at default scale -->
    <div class="flex flex-col sm:h-3/4 sm:min-h-133 sm:flex-row items-stretch gap-1 select-none">
      <div class="sm:w-32 mx-8 mt-4 sm:mx-0 sm:mt-0 rounded border border-fp-border bg-fp-bg md:w-48 lg:w-64 dark:border-gray-700 dark:bg-fp-bg-dark">
        <NodeInfo {selection} {model} />
      </div>
      <!-- below sm side gutters for mobile scrolling -->
      <div class="mx-8 mt-4 sm:mx-0 sm:mt-0 grow overflow-hidden rounded border border-fp-border dark:border-gray-700">
        <DiagramSet bind:selection bind:model></DiagramSet>
      </div>
    </div>
    <!-- footer -->
    <div
      class="relative mx-8 my-4 sm:mx-0 sm:my-1 flex grow flex-col rounded border border-fp-border bg-fp-bg-lightish sm:min-h-0 sm:overflow-hidden dark:border-gray-700 dark:bg-gradient-to-r dark:from-fp-bg-dark dark:to-fp-bg-darkened"
    >
      <div aria-hidden="true" class="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded">
        <div
          class="absolute inset-0 transform-gpu opacity-50 blur-2xl dark:opacity-40"
          style="background:
            radial-gradient(55% 140% at 50% 118%, rgba(34, 211, 238, 0.55), transparent 70%),
            radial-gradient(48% 125% at 6% -18%, rgba(3, 105, 161, 0.45), transparent 70%),
            radial-gradient(48% 125% at 94% -18%, rgba(3, 105, 161, 0.45), transparent 70%);"
        ></div>
      </div>
      <div class="grow space-y-3 p-3 text-fp-light-accent sm:min-h-0 sm:overflow-y-auto dark:text-white">
        <p class="text-lg font-semibold">This sample demonstrates GoJS Diagrams alongside a 3D model made with <a href="https://threejs.org/" target="_blank">ThreeJS</a>.</p>
        <p>
          Three separate GoJS Diagrams observe a single model, each showing two of three coordinate
          planes. When Nodes are moved or resized, two-way bindings on the Node Templates transmit
          those changes back to the model, automatically updating the other GoJS Diagrams. The ThreeJS
          view is updated with a Model change listener (<a
            target="_blank"
            href="https://gojs.net/latest/api/symbols/Model.html#addChangedListener"
            ><code>model.addChangedListener</code></a
          >).
        </p>
        <p>
          This sample also demonstrates GoJS alongside Svelte, where one component creates a GoJS
          model and passes it to children components. Those components bind the model and a selection
          variable, to pass upwards to update the state of other diagrams and the UI. A simple node
          information component is included to show details about a selected object.
        </p>
        <p>
          <a target="_blank" href="https://github.com/NorthwoodsSoftware/gojs-projects"
            >The GoJS-3D project source code can be found here.</a
          >
        </p>
        <p>
          <a href="https://gojs.net">gojs.net</a> -
          <a href="https://gojs.net/latest/samples/">see all GoJS samples</a>
        </p>
      </div>
    </div>
  </div>
</div>
