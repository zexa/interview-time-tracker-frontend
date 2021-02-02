<script>
    export let buttonType = "hollow"
    export let inline = false;
    export let type = '';

    if (inline) {
        buttonType = buttonType + " inline";
    }

    buttonType = buttonType + " font"
</script>

<style>
    .inline {
        display: inline-block;
        margin-right: 2em;
        margin-top: 1em;
    }

    button {
        font-family: Mulish,serif;
        font-style: normal;
        font-weight: bold;
        font-size: .8em;
        display: flex;
        align-items: center;
        text-align: center;
        padding: 1em 2.3em;
    }

    .hollow {
        background: #FFFFFF;
        border: 1px solid var(--background-color-3);
        box-sizing: border-box;
        border-radius: 5px;
        color: var(--foreground-color-1);
    }

    .hollow:hover {
        border: 1px solid var(--foreground-color-1);
    }
</style>

<button class={buttonType} {type} on:click><slot></slot></button>