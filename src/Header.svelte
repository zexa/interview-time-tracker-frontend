<script>
    import NavLink from './components/NavLink.svelte';
    import {Session} from 'svelte-session-manager';
    import {navigate} from 'svelte-routing';

    let session = new Session(sessionStorage);
    function handleLogout() {
        session.clear();
        session.save();
        navigate('/');
    }
</script>

<style>
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
        margin-left: 20px;
    }
</style>

<header>
    <div class="header-container">
        <div class="header-left">interview-time-tracker</div>
        <div class="header-right">
            <span>
                <NavLink to="tasks">Tasks</NavLink>
            </span>
            <span>
                <NavLink to="reports">Reports</NavLink>
            </span>
            <span on:click={handleLogout}>Logout</span>
        </div>
    </div>
</header>
