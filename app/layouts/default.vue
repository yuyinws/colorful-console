<template>
  <main class="font-sans">
    <layouts-header />

    <div class="mx-auto px-4 mt-4 sm:px-6 lg:px-8 max-w-7xl">
      <div class="flex flex-col lg:grid lg:grid-cols-10 lg:gap-8">
        <div class="lg:col-span-8">
          <slot />
        </div>
      </div>
    </div>
  </main>
</template>
