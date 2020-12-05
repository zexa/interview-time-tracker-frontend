<script>
    import Icon from 'fa-svelte';
    import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';

    export let name;

    let nodeRef;

    function removeNode() {
        nodeRef.parentNode.removeChild(nodeRef);
    }
</script>

<style>
    .modal {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        background: #FFFFFF;
        box-shadow: 0px 15px 45px -12px rgba(0, 29, 147, 0.15);
        border-radius: 3px;

        min-width: 45%;
    }

    .modal-wrapper {
        margin: var(--spacing-3);
        display: inline-block;
    }

    .close-button {
        position: absolute;
        top: 1em;
        right: 1em;
        padding: 0;
        border: none;
        background: none;
    }

    .close-button:focus {
        outline: none;
    }

    .modal-name {
        font-style: normal;
        font-weight: 800;
        font-size: 1.5em;
        color: var(--foreground-color-2)
    }

    .modal-content-wrapper {
        margin-top: var(--spacing-3);
    }
</style>

<section bind:this={nodeRef} class="modal">
    <button on:click={removeNode} class="close-button"><Icon class="header-icon" icon={faTimes}/></button>
    <div class="modal-wrapper">
        <span class="modal-name">{name}</span>
        <div class="modal-content-wrapper">
            <slot/>
        </div>
    </div>
</section>