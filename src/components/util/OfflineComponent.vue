<template>
    <v-main>
        <div
            class="d-flex justify-space-around align-center primary"
            style="height: 100%">
            <div class="col-12 col-md-6 text-center">
                <v-card>
                    <v-card-text>
                        <p class="text-h5 text--primary">
                            {{ $t('offline.message') }}
                        </p>
                    </v-card-text>
                </v-card>
            </div>
        </div>
    </v-main>
</template>

<script>
export default {
    name: 'offline'
}
</script>

<style>

</style>