<script>
    import LoginPage from "./LoginPage.svelte";
    import {Router, Route} from 'svelte-routing';
    import RegisterPage from './RegisterPage.svelte';
    import TasksPage from './TasksPage.svelte';
    import ReportsPage from './ReportsPage.svelte';
    import CreateTaskPage from './CreateTaskPage.svelte';

    let url = '';
</script>

<style>
    :global(@font-face) {
        font-family: 'Mulish',serif;
        font-style: normal;
        font-weight: 400;
        src: local('Mulish Regular'), url(https://fonts.gstatic.com/s/mulish/v1/1Ptyg83HX_SGhgqO0yLcmjzUAuWexZNR8aevGw.woff2) format('woff2');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
    }

    :global(:body) {
        font-family: 'Mulish', sans-serif;
        font-weight: 500;
    }

    :global(:root) {
        font-family: 'Mulish', sans-serif;
        --background-color: #F7F8FC;
        --background-color-2: #F2F3F6;
        --background-color-3: #DAE1F5;
        --foreground-color-1: #545D7A;
        --foreground-color-2: #6A6E79;
        --shadow-color: #979797;
        --spacing-1: 8em;
        --spacing-2: 4em;
        --spacing-3: 2em;
        --spacing-4: 1em;
        --header-icon-size: 1.5em;
        --header-icon-spacing: 1.5em;
    }
</style>

<Router url="{url}">
    <Route path="/" component="{LoginPage}" />
    <Route path="register" component="{RegisterPage}" />
    <Route path="tasks" component="{TasksPage}" />
    <Route path="createTask" component="{CreateTaskPage}" />
    <Route path="reports" component="{ReportsPage}" />
</Router>
