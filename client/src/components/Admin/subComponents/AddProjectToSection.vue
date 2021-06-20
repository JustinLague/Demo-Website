<template>
    <b-modal
        id="modal-add-project-to-section" 
        size="lg" 
        title="Ajouter une nouveau projet"
        centered
        modal-ok="Sauvegarder"
    >
        <div class="container-fluid">
            <div class="row">
                <div class="col-6">
                <div class="row">
                        <div>
                            <b-dropdown id="dropdown-1" text="Dropdown Button" class="m-md-2">
                                <b-dropdown-item>First Action</b-dropdown-item>
                                <b-dropdown-item>Second Action</b-dropdown-item>
                                <b-dropdown-item>Third Action</b-dropdown-item>
                                <b-dropdown-divider></b-dropdown-divider>
                                <b-dropdown-item active>Active action</b-dropdown-item>
                                <b-dropdown-item disabled>Disabled action</b-dropdown-item>
                            </b-dropdown>
                        </div>
                </div>
                <div class="row">
                    Description du projet
                </div>
                </div>
                <div class="col-6">
                    image
                </div>
            </div>
        </div>
        <template #modal-footer="{ ok, cancel }">
            <b-button size="sm" variant="danger" @click="cancel()">
                {{ $t('admin.cancel') }}
            </b-button>
            <b-button size="sm" variant="primary" @click="ok()">
                {{ $t('admin.add') }}
            </b-button>
        </template>
    </b-modal>
</template>

<script>
export default {
    methods: {
        ok() {
        },
        cancel() {

        }
    }
}
</script>

<style>

</style>