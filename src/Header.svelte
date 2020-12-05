<script>
    import Icon from 'fa-svelte';
    import { faInbox } from '@fortawesome/free-solid-svg-icons/faInbox';
    import { faBell } from '@fortawesome/free-regular-svg-icons/faBell';
    import { faAngleDown } from '@fortawesome/free-solid-svg-icons/faAngleDown';

    export let name = "Guest";
    export let avatarSrc = null;
    let style = getComputedStyle(document.body);
</script>

<header>
    <div class="header-container">
        <div class="header-left">Trelp</div>
        <div class="header-right">
            <Icon class="header-icon header-icon-spacing" icon={faInbox}/>
            <Icon class="header-icon header-icon-spacing" icon={faBell}/>
            <div>
                {name}
                <Icon icon={faAngleDown}/>
            </div>
        </div>
    </div>
</header>

<style>
    :global(.header-icon) {
        width: var(--header-icon-size) !important;
        height: var(--header-icon-size) !important;
        font-size: 1em;
    }

    :global(.header-icon-spacing) {
            margin-left: var(--header-icon-spacing);
    }

    header {
        width: 100%;
        height: 5em;
        left: 0px;
        top: 0px;

        background: #FFFFFF;
        color: var(--foreground-color-1);
        box-shadow: 0px 15px 45px -12px rgba(0, 29, 147, 0.15);
        font-weight: 700;
        font-size: 11pt;
    }

    .header-container {
        margin: 0 var(--spacing-2);
        display: grid;
        grid-template-columns: 1fr 1fr;
        height: 100%;
    }

    .header-left {
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
        justify-content: flex-start;
    }

    .header-right {
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
        justify-content: flex-end;
    }

    .header-right > * {
        margin-left: var(--header-icon-spacing);
    }
</style>