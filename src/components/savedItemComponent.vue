<template>
    <div class="t-container">
      <span>Saved {{ itemName }}!</span>
      <button class="action" @click.stop="clicked">Go to profile</button>
    </div>
  </template>
  <script>
  export default {
    props: ["itemName"],
    methods: {
      clicked() {
        // Emit a "click" event when clicked.
        // Can be any event though and even pass parameters back
        // go to profile page
        this.$emit("click");
      }
    }
  };
  </script>
  <style>
  
  .t-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
  }
  .action {
  height: 40px;
  padding: 5px 10px;
  border-radius: 5px;
  color: white; 
    background: none;
  cursor: pointer;
  border: thin solid lightslategray;
}
  </style>