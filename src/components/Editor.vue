<template>
  <div class="editor">
    <v-container class="editor-container" fluid pa-0>
      <v-layout wrap fill-height>
        <v-flex xs3 class="side-bar">
          <v-layout column wrap>
            <v-flex>
              <v-toolbar height="40px" class="icon-bar">
                <v-layout justify-space-around>
                  <v-tooltip bottom>
                    <v-btn icon slot="activator">
                      <v-icon color="indigo" @click="addMemo">note_add</v-icon>
                    </v-btn>
                    <span>メモの追加</span>
                  </v-tooltip>
                  <v-tooltip bottom>
                    <v-btn icon slot="activator">
                      <div v-if="!isSaving">
                        <v-icon color="indigo" @click="saveMemos">save</v-icon>
                      </div>
                      <div v-else>
                        <v-progress-circular
                          :size="24"
                          indeterminate
                          color="indigo"
                        /></v-progress-circular>
                      </div>
                    </v-btn>
                    <span v-if="!isSaving">メモの保存</span>
                    <span v-else>保存中...</span>
                  </v-tooltip>
                  <v-tooltip bottom>
                    <div slot="activator">
                      <v-dialog
                        v-model="deletionDialog"
                        width="500"
                      >
                        <v-btn icon slot="activator">
                          <v-icon color="indigo" >delete_outline</v-icon>
                        </v-btn>
                        <v-card>
                          <v-card-text>
                            本当に削除しますか？
                          </v-card-text>
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                              color="secondary"
                              flat="flat"
                              @click="deletionDialog = false"
                            >
                              いい
                            </v-btn>
                            <v-btn
                              color="primary"
                              flat="flat"
                              @click="deleteMemo"
                            >
                              はい
                            </v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </div>
                    <span>選択中のメモを削除</span>
                  </v-tooltip>
                </v-layout>
              </v-toolbar>
            </v-flex>
            <v-flex
              class="memoList"
              v-for="(memo,index) in memos"
              @click="selectMemo(index)"
              :data-selected="index == selectedIndex"
            >
              <p class="memoTitle">{{ displayTitle(memo.markdown) }}</p>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex xs4>
          <textarea
            class="markdown"
            v-model="memos[selectedIndex].markdown"
          ></textarea>
        </v-flex>
        <v-flex xs4
          class="preview markdown-body"
          v-html="preview()"
        >
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import marked from "marked";

marked.setOptions({
  breaks: true,
});

export default {
  name: "editor",
  props: ["user"],
  data() {
    return {
      memos: [
        {
          markdown: ""
        }
      ],
      selectedIndex: 0,
      isSaving: false,
      deletionDialog: false,
    };
  },
  created: function() {
    var self = this;
    firebase
      .firestore()
      .collection('memos')
      .doc(this.user.uid)
      .get()
      .then(function(doc) {
        if (doc.exists) {
          self.memos = doc.data().val;
        }
      });
  },
  mounted: function() {
    document.onkeydown = e => {
      if (e.key == 's' && e.metaKey) {
        this.saveMemos();
        return false;
      }
    }
  },
  beforeDestroy: function() {
    document.onkeydown = null;
  },
  methods: {
    addMemo: function() {
      this.memos.push({
        markdown: "無題のメモ"
      });
    },
    deleteMemo: function() {
      this.memos.splice(this.selectedIndex, 1);
      if (this.selectedIndex > 0) {
        this.selectedIndex--;
      }
      this.deletionDialog = false;
    },
    saveMemos: function() {
      var self = this;

      self.isSaving = true;
      firebase
        .firestore()
        .collection('memos')
        .doc(this.user.uid)
        .set({val: this.memos})
        .then(function() {
          self.isSaving = false;
        })
        .catch(function(error) {
          self.isSaving = false;
        });
    },
    selectMemo: function(index) {
      this.selectedIndex = index;
    },
    preview: function() {
      return marked(this.memos[this.selectedIndex].markdown)
        .replace(/\[ \]/g, '<input type="checkbox"></input>')
        .replace(/\[x\]/g, '<input type="checkbox" checked="checked"></input>');
    },
    displayTitle: function(text) {
      return text.split(/\n/)[0];
    }
  }
};
</script>
<style lang="scss" scoped>
.editor-container {
  height: 100vh;
}
.side-bar {
  overflow: scroll;
}
.icon-bar {
  border-bottom: 1px solid #000;
}
.memoList {
  padding: 10px;
  box-sizing: border-box;
  text-align: left;
  border-bottom: 1px solid #000;
  &:nth-child(even) {
    background-color: #ccc;
  }
  &.data-selected {
    background-color: #ccf;
  }
}
.memoTitle {
  height: 1.5em;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
}
.markdown {
  float: left;
  height: 100%;
  width: 100%;
  background: #eee;
  border-left: 1px solid #000;
  border-right: 1px solid #000;
}
.preview {
  float: left;
  width: 40%;
  text-align: left;
}
</style>
