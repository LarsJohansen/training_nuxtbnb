<template>
  <div>{{ error.statusCode }} {{ error.message }} - Oh NOOOOES!!</div>
</template>
<script>
export default {
  props: {
    error: {
      type: Object,
      required: true,
    },
  },
};
</script>
