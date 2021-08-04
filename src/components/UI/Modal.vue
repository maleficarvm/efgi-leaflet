<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div
        class="modal"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        <header class="modal-header" id="modalTitle">
          <slot name="header">
            <h2>Добро пожаловать в ЕБГИ ЦНИГРИ! (Beta v2.2)</h2>
          </slot>
        </header>
        <section class="modal-body" id="modalDescription">
          <slot name="body">
            Единый банк геологической информации ФГБУ "ЦНИГРИ" (ЕБГИ)
            предназначен для обеспечения сотрудников ФГБУ "ЦНИГРИ" цифровыми
            геологическими материалами, необходимыми для выполнения работ по
            государственным контрактам и государственным заданиям, написания
            научных трудов и другой деятельности, направленной на выполнение
            задач организации. Подробная информация находится во вкладке "О
            Едином Банке"
          </slot>
        </section>
        <footer class="modal-footer">
          <slot name="footer">
            <button type="button" class="btn btnDefault" @click="toInfo">
              О Едином Банке
            </button>
            <button
              type="button"
              class="btn btnDefault"
              @click="close"
              aria-label="Close modal"
            >
              Закрыть
            </button>
          </slot>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "modal",
  methods: {
    close() {
      this.$emit("close");
    },
    toInfo() {
      this.$router.push("/info");
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss">
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal {
  max-width: 40em;
  background: #ffffff;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  border-radius: 4px;
}
.modal-header,
.modal-footer {
  padding: 20px;
  display: flex;
}
.modal-header {
  justify-content: center;
}
.modal-footer {
  justify-content: flex-end;
}
.modal-body {
  position: relative;
  padding: 20px 10px;
}
.btn-close {
  border: none;
  font-size: 17px;
  margin-left: 40px;
  cursor: pointer;
  font-weight: bold;
  background: transparent;
}
.btn {
  font-size: 14px;
  margin: 5px;
}
</style>
