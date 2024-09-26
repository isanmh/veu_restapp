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
            <h4>Form Update Contact</h4>
          </div>
          <div class="card-body">
            <!-- form -->
            <form @submit.prevent="update">
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
              <!-- image lama -->
              <div v-if="contact.image" class="form-group mt-2">
                <img
                  :src="preview.img ? preview.img : url + contact.image"
                  class="img-fluid"
                  alt="image"
                  width="100"
                />
              </div>
              <button type="submit" class="btn btn-primary mt-3">Update</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { api, urlImage } from "@/config/api";

export default {
  setup() {
    const contact = reactive({
      name: "",
      email: "",
      phone: "",
      image: "",
    });

    const validation = ref({});
    const url = ref(urlImage);
    const preview = reactive({
      img: "",
    });

    const router = useRouter();
    const route = useRoute();

    onMounted(async () => {
      await api
        .get(`/contacts/${route.params.id}`)
        .then((res) => {
          contact.name = res.data.data.name;
          contact.email = res.data.data.email;
          contact.phone = res.data.data.phone;
          contact.image = res.data.data.image;
        })
        .catch((err) => {
          console.log(err);
        });
    });

    const uploadImage = (e) => {
      contact.image = e.target.files[0];
      preview.img = URL.createObjectURL(e.target.files[0]);
    };

    const update = async () => {
      await api
        .put(`/contacts/${route.params.id}`, contact)
        .then((res) => {
          router.push({ name: "contacts.index" });
        })
        .catch((err) => {
          validation.value = err.response.data.errors;
        });
    };
    return { contact, validation, router, update, url, preview, uploadImage };
  },
};
</script>
