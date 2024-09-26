<template>
  <div class="container my-5">
    <div class="row justify-content-center">
      <div class="col-md-10">
        <router-link
          :to="{ name: 'contacts.create' }"
          class="btn btn-primary mb-2"
          >Add Contact</router-link
        >
        <div class="card">
          <div class="card-header">
            <h4>List Contacts</h4>
          </div>
          <div class="card-body table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Nama</th>
                  <th>Email</th>
                  <th>Telepon</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(contact, index) in contacts" :key="index">
                  <td>
                    <img
                      v-if="contact.image"
                      :src="url + contact.image"
                      alt=""
                      width="50"
                      height="50"
                      class="img-fluid"
                    />
                  </td>
                  <td>{{ contact.name }}</td>
                  <td>{{ contact.email }}</td>
                  <td>{{ contact.phone }}</td>
                  <td>
                    <div class="btn-group">
                      <router-link
                        :to="{
                          name: 'contacts.edit',
                          params: { id: contact.id },
                        }"
                        class="btn btn-sm btn-outline-info"
                        >Edit</router-link
                      >
                      <button
                        class="btn btn-sm btn-outline-danger"
                        @click="destroy(contact.id, index)"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from "axios";
import { onMounted, ref } from "vue";
import { api, urlImage } from "@/config/api";
import Swal from "sweetalert2";

export default {
  setup() {
    const contacts = ref([]);
    const url = urlImage;

    onMounted(async () => {
      await api
        // .get("http://localhost:5000/api/contacts")
        .get("/contacts")
        .then((res) => {
          console.log(res.data.data);
          contacts.value = res.data.data;
        })
        .catch((err) => {
          console.log(err.response);
        });
    });

    const destroy = (id, index) => {
      // Sweetalert2
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          api
            // .delete(`http://localhost:5000/api/contacts/${id}`)
            .delete(`/contacts/${id}`)
            .then((res) => {
              console.log(res.data);
              contacts.value.splice(index, 1);
            })
            .catch((err) => {
              console.log(err.response.data);
            });
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        }
      });
    };

    return { contacts, destroy, url };
  },
};
</script>
