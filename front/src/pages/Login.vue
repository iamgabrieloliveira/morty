<template>
    <div class="h-screen flex items-center justify-center">
        <div class="flex flex-col gap-3 w-96">
            <h1 class="text-3xl text-center">Log in</h1>
            <label class="text-1xl" for="email_input">Email</label>
            <input v-model="input.email" class="border rounded pl-2" type="email" name="email_input" id="email_input">
            <label for="password_input">Password</label>
            <input v-model="input.password" class="border rounded pl-2" type="password" name="password_input" id="password_input">
            <button @click="handleLogin" class="bg-blue-400 rounded w-24 mx-auto text-white transition-opacity p-2 hover:opacity-80">Sign in</button>
        </div>
    </div>
</template>
<script setup lang="ts">
import { Ref, ref } from 'vue';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import api from '../api';
import cookie from 'js-cookie';
import { IAuthPostResponse } from '../../../back/useCases/auth/AuthController'

type TInput = {
    email: string,
    password: string,
}

const router = useRouter();

const input: Ref<TInput> = ref({ email: '', password: '' });

async function handleLogin() {
    const { email, password } = input.value;

    let valid = true;

    if (!email) {
        toast.warning('The field email is required.', { theme: 'dark' });
        valid = false;
    }

    if (!password) {
        toast.warning('The field email is required.', { theme: 'dark' });
        valid = false;
    }

    if (!valid) {
        return;
    }

    try {
        const response =  await api.post('/auth', input.value);
        const data: IAuthPostResponse = response.data;
        cookie.set('morty:token', data.token);

        toast(`Welcome, ${data.user.name}`, { theme: 'dark' });

        setTimeout(() => {
            router.push({ name: 'dashboard' });
        }, 300);
    } catch (error) {
        toast.error('Wrong credentials.');
    }
}

</script>

<style scoped>

</style>