<template>
  <section>
    <div v-for="person in personal" v-editable="person.content">
      <img :src="person.content.bild" alt="" style="max-width: 200px">
      <h1>{{person.content.namn}}</h1>
      <p>{{person.content['jobb_titel']}}</p>
    </div>
  </section>
</template>

<script>

import { storyblokPreview } from '@/mixins/storyblokPreview';

export default {
  mixins: [storyblokPreview],
  data () {
    return {
      personal: {}
    }
  },
  asyncData (context) {
    let version = context.query._storyblok || context.isDev ? 'draft' : 'published';
    let self = this;

    return context.app.$storyapi.get('cdn/stories', {
      version: version,
      starts_with: 'personal',
      is_startpage: 0
    }).then((res) => {
      console.log(JSON.parse(JSON.stringify(res.data.stories)));
      return { personal: res.data.stories }
    }).catch((res) => {
      context.error({ statusCode: res.response.status, message: res.response.data })
    })
  }
}
</script>

<style>

</style>

