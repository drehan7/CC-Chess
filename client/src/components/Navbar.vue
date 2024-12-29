<script setup>
</script>
<template>
    <div class="nav-container">
    <div class="nav-title">CC Chess (Command & Conquer)</div>
    <nav>
        <div>
            <RouterLink to="/">Home</RouterLink>
        </div>
        <div>
            <RouterLink to="/play">Play!</RouterLink>
        </div>
    </nav>
    </div>
</template>

<style scoped>

.nav-container {
    display: flex;
    justify-content: space-around;
    border: 1px solid blue;
}

.nav-title {
    color: green;
    font-size: 2rem;
}

nav {
    display: flex;
    justify-content: space-around;
    border: 5px solid red;
}

nav div {
    border: 1px solid green;
    font-size: 2rem;
}

</style>
