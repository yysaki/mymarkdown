<template>
  <div class="editor">
    <v-container fluid grid-list-md>
      <v-layout wrap>
        <v-flex xs3>
          <v-layout column wrap>
            <v-flex
              class="memoList"
              v-for="(memo,index) in memos"
              @click="selectMemo(index)"
              :data-selected="index == selectedIndex"
            >
              <p class="memoTitle">{{ displayTitle(memo.markdown) }}</p>
            </v-flex>
            <v-layout column>
              <v-flex>
                <v-btn outline color="indigo" @click="addMemo">メモの追加</v-btn>
              </v-flex>
              <v-flex>
                <v-btn outline color="indigo" v-if="memos.length > 1" @click="deleteMemo">選択中のメモを削除</v-btn>
              </v-flex>
              <v-flex>
                <v-btn outline color="indigo" @click="saveMemos">メモの保存</v-btn>
              </v-flex>
            </v-layout>
          </v-layout>
        </v-flex>
        <v-flex xs4>
          <textarea
            class="markdown"
            v-model="memos[selectedIndex].markdown"
            width="100%"
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
      selectedIndex: 0
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
    },
    saveMemos: function() {
      firebase
        .firestore()
        .collection('memos')
        .doc(this.user.uid)
        .set({val: this.memos});
    },
    selectMemo: function(index) {
      this.selectedIndex = index;
    },
    preview: function() {
      return marked(this.memos[this.selectedIndex].markdown);
    },
    displayTitle: function(text) {
      return text.split(/\n/)[0];
    }
  }
};
</script>
<style lang="scss" scoped>
.memoListWrapper {
  width: 19%;
  float: left;
  border-top: 1px solid #000;
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
.addMemoBtn {
  margin-top: 20px;
}
.markdown {
  float: left;
  width: 40%;
  height: 500px;
}
.preview {
  float: left;
  width: 40%;
  text-align: left;
}
</style>
