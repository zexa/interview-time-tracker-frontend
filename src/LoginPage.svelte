<script>
    import Button from './components/Button.svelte';
    import NavLink from './components/NavLink.svelte';
    import {navigate} from 'svelte-routing'
    import {Session} from 'svelte-session-manager';
    import jwtDecode from 'jwt-decode';

    let username = '';
    let password = '';

    let isSuccess = false;
    let isLoading = false;
    let errors = {};

    let session = new Session(sessionStorage);

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function redirect() {
        await sleep(1000); // After initial page render navigate won't draw the next view without this sleep.
        navigate('/tasks');
    }

    async function login(session, endpoint, username, password) {
        try {
            const response = await fetch(endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username,
                    password
                })
            });
            if (response.ok) {
                const data = await response.json();
                if (!data.token) {
                    errors = {
                        'reason': 'Missing token'
                    };
                }
                const token = jwtDecode(data.token);

                session.update({
                    username,
                    access_token: data.token,
                    expirationDate: token.exp,
                });
                session.save();
            } else {
                errors = await response.json();
            }
        } catch (e) {
            throw e;
        }
    }

    function handleSubmit() {
        try {
            isLoading = true;
            register(
                session,
                'http://localhost:8080/login',
                username,
                password
            ).then(() => {
                isLoading = false;
                isSuccess = true;
            });
        } catch (e) {
            isLoading = false;
        }
    };
</script>

<style>

</style>

<form on:submit|preventDefault={handleSubmit}>
    {#if isSuccess}
        <div>
            You've been successfully logged in. Redirecting...
            {#await redirect()}{/await}
        </div>
    {:else}
        <h1>Login</h1>

        <label for="username">Username</label>
        <input id="username" name="username" placeholder="name@example.com" bind:value={username} />

        <label for="password">Password</label>
        <input id="password" name="password" type="password" bind:value={password} />

        <br />
        <Button type="submit">
            {#if isLoading}Logging in...{:else}Log in{/if}
        </Button>

        {#if Object.keys(errors).length > 0}
            <ul>
                {#each Object.keys(errors) as field}
                    <li>{field}: {errors[field]}</li>
                {/each}
            </ul>
        {/if}

        <br />
        <NavLink to="register">Don't have an account yet?</NavLink>
    {/if}
</form>