<script>
    import Modal from './Modal.svelte';
    import Button from './Button.svelte';

    export let email = {
        from: 'customer@example.com',
        to: 'company@example.com',
        body: 'Hello,\n\nCould you please translate attached text files until this friday 10:00 AM GMT+2?\n\nKind regards,\n\nCustomer',
        attachments: [
            {
                name: 'lt_en_1.pdf',
                href: 'https://google.com/',
            },
            {
                name: 'lt_en_2.pdf',
                href: 'https://google.com/',
            },
            {
                name: 'lt_en_2.pdf',
                href: 'https://google.com/',
            },
        ],
    };
</script>

<style>
    .wrapper {
        margin-top: 2em;
    }

    .recipients-wrapper {
        display: grid;
        grid-template-columns: 1fr 1fr;
    }

    .block {
        display: block;
        font-family: Mulish;
        font-style: normal;
        font-weight: bold;
        font-size: 1em;
        line-height: 18px;

        color: var(--foreground-color-2);
    }
</style>

<Modal name="Email">
    <div class="wrapper recipients-wrapper">
        <div>
            <span class="block">From</span>
            <span>{email.from}</span>
        </div>
        <div>
            <span class="block">To</span>
            <span>{email.to}</span>
        </div>
    </div>
    <div class="wrapper">
        <span class="block">Body</span>
        <span>{email.body}</span>
    </div>
    <div class="wrapper">
        <span class="block">Attachments</span>
        {#each email.attachments as attachment}
            <a href={attachment.href}><Button inline=true name={attachment.name} /></a>
        {/each}
    </div>
</Modal>