<template>
  <div class="container my-5">
    <div class="row justify-content-center">
      <div class="col-md-10">
        <router-link
          :to="{ name: 'contacts.index' }"
          class="btn btn-primary mb-2"
          >Back</router-link
        >
        <div class="card">
          <div class="card-header">
            <h4>Form Add Contacts</h4>
          </div>
          <div class="card-body">
            <!-- validation alert -->
            <!-- <div v-if="validation.length > 0" class="alert alert-danger">
              <ul>
                <li v-for="(err, index) in validation" :key="index">
                  {{ err.msg }}
                </li>
              </ul>
            </div> -->

            <!-- form -->
            <form @submit.prevent="store">
              <div class="form-group mt-2">
                <label for="name">Nama</label>
                <input
                  type="text"
                  class="form-control"
                  id="name"
                  placeholder="Masukkan nama"
                  v-model="contact.name"
                />
                <div
                  v-for="(err, index) in validation"
                  :key="index"
                  class="text-danger"
                >
                  <small v-if="err.param === 'name'">{{ err.msg }}</small>
                </div>
              </div>
              <div class="form-group mt-2">
                <label for="email">Email</label>
                <input
                  type="text"
                  class="form-control"
                  id="email"
                  placeholder="Masukkan email"
                  v-model="contact.email"
                />
                <div
                  v-for="(err, index) in validation"
                  :key="index"
                  class="text-danger"
                >
                  <small v-if="err.param === 'email'">{{ err.msg }}</small>
                </div>
              </div>
              <div class="form-group mt-2">
                <label for="phone">Telepon</label>
                <input
                  type="text"
                  class="form-control"
                  id="phone"
                  placeholder="Masukkan telepon"
                  v-model="contact.phone"
                />
              </div>
              <div
                v-for="(err, index) in validation"
                :key="index"
                class="text-danger"
              >
                <small v-if="err.param === 'phone'">{{ err.msg }}</small>
              </div>
              <div class="form-group mt-2">
                <label for="image">Image</label>
                <input
                  type="file"
                  class="form-control"
                  id="image"
                  placeholder="Masukkan image"
                  @change="uploadImage($event)"
                />
              </div>
              <!-- preview -->
              <div class="mt-2">
                <img :src="preview.img" alt="" width="100" />
              </div>

              <button type="submit" class="btn btn-primary mt-3">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { api } from "@/config/api";

export default {
  setup() {
    const contact = reactive({
      name: "",
      email: "",
      phone: "",
      image: "",
    });

    const validation = ref({});
    const preview = reactive({
      img: "",
    });

    const router = useRouter();

    // @change="contact.image = $event.target.files[0]"
    const uploadImage = (e) => {
      contact.image = e.target.files[0];
      preview.img = URL.createObjectURL(e.target.files[0]);
    };

    const store = async () => {
      await api
        .post("/contacts", contact)
        .then((res) => {
          router.push({ name: "contacts.index" });
        })
        .catch((err) => {
          console.log(err.response.data.errors);
          validation.value = err.response.data.errors;
        });
    };
    return { contact, validation, router, store, uploadImage, preview };
  },
};
</script>
