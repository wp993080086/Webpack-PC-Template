import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import styles from './not-found.module.scss'

export default defineComponent({
  name: 'notFound',
  setup() {
    const Router = useRouter()
    // 去主页
    const toHome = () => {
      Router.push({ name: 'InstallManage' })
    }
    return () => (
      <div class={styles.not_found_box}>
        <div class={styles.main}></div>
        <div class={styles.hint}>抱歉，您访问的页面走丢了~</div>
        <div class={styles.btn}>
          <el-button type="primary" onClick={toHome}>返回首页</el-button>
        </div>
      </div>
    )
  }
})
