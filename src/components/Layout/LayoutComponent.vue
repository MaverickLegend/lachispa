<template>
    <div>
        <header class="bg-primary text-white p-4">
            <h1 class="text-2xl">Dataflow Management</h1>
        </header>
        <main class="p-4">
            <slot />
        </main>
        <!-- <footer class="bg-gray-800 text-white p-4 text-center">
            &copy; 2023 Dataflow Management
        </footer>
        <div class="fixed bottom-0 right-0 p-4">
            <button class="btn btn-primary" @click="$router.push('/dataflows')">Go to Dataflows</button>
            <button class="btn btn-secondary" @click="$router.push('/dataflows/create')">Create Dataflow</button>
            <button class="btn btn-secondary" @click="$router.push('/dataflows/validate')">Validate Dataflow</button>
            <button class="btn btn-secondary" @click="$router.push('/dataflows/execute')">Execute Dataflow</button>
        </div> -->
    </div>
</template>