<template>
  <!-- <el-dialog    width="30%" 
             center
             :modal-append-to-body="false"
             :append-to-body="true"
             :visible="isVisible"
             @close="close"
             :before-close="beforeClose"
             v-bind="$attrs">
    <slot>
      <span>{{ message }}</span>
    </slot>
    <span slot="footer" class="dialog-footer">
       <el-button id="save-button" type="success" :loading="loading" @click.native="confirm">
         {{ confirmLabel }}
       </el-button>
      <el-button id="close-button" type="danger" @click.native="close">
        {{ cancelLabel }}
      </el-button>
  </span>
  </el-dialog> -->

  <el-dialog title="Outer Dialog" :visible="isVisible">
    <el-dialog width="30%" title="Inner Dialog" :visible.sync="innerVisible" append-to-body >
    </el-dialog>
    <slot>
      <span>asdasdsadasdasdsadasdsadsadsad</span>
    </slot>
    <span slot="footer" class="dialog-footer">
      <el-button id="save-button" type="success" :loading="loading"  @click.native="visible= false">
         {{ confirmLabel }}q232
       </el-button>
       <el-button id="close-button" type="danger" @click="close()">
        {{ cancelLabel }}qweqwewqe
      </el-button>
    </span>
  </el-dialog>


</template>
<script>
import { Dialog } from "element-ui";
export default {
  name: "Confirm",
  components: {
    [Dialog.name]: Dialog
  },
  props: {
    syncViaProps: {
      type: Boolean,
      default: false
    },
    visible: {
      type: Boolean,
      default: false
    },
    message: {
      type: String,
      default: ""
    },
    cancelLabel: {
      type: String,
      default: "Cancel"
    },
    confirmLabel: {
      type: String,
      default: "Yes"
    },
    loading: {
      type: Boolean,
      default: false
    },
    closeOnConfirm: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      promise: undefined,
      beforeConfirm: () => { },
      beforeCancel: () => { },
      internalVisible: false,
      resolvePromise: undefined,
      rejectPromise: undefined
    };
  },
  computed: {
    isVisible() {
      return this.visible || this.internalVisible;
    }
  },
  methods: {
    beforeClose(done) {
      done();
      this.updateVisible(false);
    },
    async close() {
      console.log('close')
      let done = () => {
        this.updateVisible(false);
        this.rejectPromise();
      };

      if (this.isVisible && this.beforeCancel) {
        await this.beforeCancel(done);
      }
      done();
    },
    updateVisible(value) {
      if (this.syncViaProps) {
        this.$emit("update:visible", value);
      } else {
        this.internalVisible = value;
      }
    },
    async confirm() {
      let done = () => {
        this.updateVisible(false);
        this.resolvePromise();
      };
      if (this.beforeConfirm) {
        await this.beforeConfirm(done);
      }
      if (this.closeOnConfirm) {
        done();
      }
    },
    show() {
      this.updateVisible(true);
      return new Promise((resolve, reject) => {
        this.resolvePromise = resolve;
        this.rejectPromise = reject;
      });
    }
  }
};
</script>
