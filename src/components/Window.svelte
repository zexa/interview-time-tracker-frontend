<script>
    export let name = '';
</script>

<style>
    .window {
        margin: var(--spacing-2) var(--spacing-1);
        background: #FFFFFF;
        box-shadow: 0 15px 45px -12px rgba(0, 29, 147, 0.15);
        border-radius: 3px;
        display: block;
    }

    .window-wrapper {
        width: 100%;
        margin: var(--spacing-3);
        display: inline-block;
    }

    .name {
        margin-bottom: var(--spacing-3);
        display: block;
    }
</style>

<section class="window">
    <div class="window-wrapper">
        <span class="name">{name}</span>
        <slot/>
    </div>
</section>