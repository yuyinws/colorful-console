<template>
  <header class="bg-background/75 backdrop-blur border-b -mb-px sticky top-0 z-50 border-gray-200 dark:border-gray-800">
    <div class="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl flex items-center justify-between font-bold gap-3 h-14">
      <NuxtLink to="https://github.com/yuyinws/colorful-console" target="_blank">
        <UButton
          icon="i-mdi:github"
          color="gray"
          variant="ghost"
          aria-label="Theme"
        />
      </NuxtLink>

      <div class="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-cyan-500 to-green-500 text-lg cursor-default">
        Colorful Console
      </div>

      <DarkToggle />
    </div>
  </header>
</template>
