<template>
    <div class="h-screen flex items-center justify-center">
        <div class="flex flex-col gap-3 w-96">
            <h1 class="text-3xl text-center">Log in</h1>
            <label class="text-1xl" for="email_input">Email</label>
            <input v-model="form.email" class="border rounded pl-2" type="email" name="email_input" id="email_input">
            <label for="password_input">Password</label>
            <input v-model="form.password" class="border rounded pl-2" type="password" name="password_input" id="password_input">
            <button @click="handleLogin" class="bg-blue-400 rounded w-24 mx-auto text-white transition-opacity p-2 hover:opacity-80">Sign in</button>
        </div>
        </div>
    </template>

<script>
import { success, error, warning } from '../toast';
import api from '../api';
import cookie from 'js-cookie'

export default {
    name: 'Login',
    data() {
        return {
            form: {
                email: '',
                password: '',
            },
        };
    },
    methods: {
         handleLogin() {
            const valid = this.validate();

            if (!valid) {
                return;
            }

            api.post('/auth', this.form)
                .then((response) => {
                    const { token } = response.data;

                    cookie.set('morty:token', token);

                    success('Login successful');

                    this.$router.push({ name: 'dashboard' })
                })
                .catch((error) => {
                    if (error.response?.status === 401) {
                        error('Wrong credentials');
                    }
                });
        },
        validate() {
            let valid = true;

            Object.entries(this.form).map(([field, value]) => {
                if (!value) {
                    valid = false;
                    warning(`The field ${field} is required.`)
                }
            });

            return valid;
        }
    },
}
</script>
