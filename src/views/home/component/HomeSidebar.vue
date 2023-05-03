<template>
    <div class="sidebar">
        <n-scrollbar style="max-height: calc(100vh - 56px)">
            <div class="menu-group">
                <span class="menu-item menu-item-with-icon" @click="goSpace('Album')">
                    <n-icon class="menu-item-icon" size="20">
                        <collection></collection>
                    </n-icon>
                    <span class="menu-text">我的相册</span>
                </span>
                <span class="menu-item menu-item-with-icon" @click="goSpace('Setting')">
                    <n-icon class="menu-item-icon" size="20">
                        <history></history>
                    </n-icon>
                    <span class="menu-text">个人设置</span>
                </span>
            </div>
            <div class="menu-group">
                <span class="menu-item menu-item-with-icon" @click="goSpace('Space')">
                    <n-icon class="menu-item-icon" size="20">
                        <me></me>
                    </n-icon>
                    <span class="menu-text">个人中心</span>
                </span>
            </div>

            <div class="menu-footer">
                <div class="links">
                    <span>
                        <n-dropdown :options="languages" @select="selectLanguage">
                            <a href="javascript:void(0);">语言-language</a>
                        </n-dropdown>
                    </span>
                </div>
                <div class="copyright">
                    <span>
                        <a href="https://github.com/wangzmgit/leaf" target="_blank">致谢优秀开源项目</a>
                    </span>
                </div>
            </div>
        </n-scrollbar>

    </div>
</template>

<script setup lang="ts">
import i18n from "@/locale";
import { Collection, History, Me } from "@/icons";
import { NDropdown, NIcon, NScrollbar } from "naive-ui";
import { onBeforeMount, } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";


// i18n
const { t } = useI18n();

const router = useRouter();


// 语言
const languages = [
    {
        label: '简体中文',
        key: 'zh-CN'
    },
    {
        label: 'english',
        key: 'en-US'
    },
    {
        label: '日本語',
        key: 'ja-JP'
    }
]

// 修改语言
const selectLanguage = (lang: "zh-CN" | "en-US" | "ja-JP") => {
    i18n.global.locale = lang;
    localStorage.setItem('locale', lang);
}


// 前往个人空间
const goSpace = (name: string) => {
    router.push({ name: name });
}


onBeforeMount(() => {
    // getPartition();
})
</script>

<style lang="less" scoped>
.sidebar {
    width: 220px;
    white-space: nowrap;
    overflow-x: hidden;
}



.menu-group {
    border-bottom: 1px solid rgba(0, 0, 0, .1);

    .menu-item {
        display: block;
        height: 30px;
        margin: 6px 10px;
        padding: 8px 0;
        line-height: 30px;
        border-radius: 6px;
        cursor: pointer;

        &-with-icon {
            display: flex;
            align-items: center;
        }

        &-only-text {
            padding-left: 30px;
        }

        &-icon {
            color: #808080;
            padding-left: 6px;
            margin-right: 10px;
        }

        &:hover {
            background-color: rgba(0, 0, 0, .1);
        }
    }

    .menu-active {
        background-color: rgba(0, 0, 0, .1);
    }
}

.menu-footer {
    color: #666;
    width: 100%;
    padding: 6px 15px;

    a {
        color: #666;
        text-decoration: none;

        &:hover {
            text-decoration: underline;
        }
    }

    .links {
        span {
            display: block;
            margin-top: 6px;
            font-size: 13px;
            line-height: 2;
        }

        .security {
            width: 12px;
            padding-right: 3px;
        }
    }

    .copyright {
        font-size: 12px;
        margin-top: 20px;
    }
}
</style>