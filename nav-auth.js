/* ============================================================
   帕帕韦斯特雷共和国 · 导航栏账户状态
   在所有页面引入，自动根据登录状态显示登录按钮或头像
   ============================================================ */

// ========== 请替换为您的 Supabase 项目信息 ==========
const SUPABASE_URL = 'https://YOUR_PROJECT_ID.supabase.co';
const SUPABASE_ANON_KEY = 'YOUR_ANON_PUBLIC_KEY';
// ===================================================

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
        storage: window.localStorage
    }
});

// 暴露到全局，方便其他脚本复用同一个客户端
window.__ppwSupabase = supabase;

// ========== 渲染逻辑 ==========
function renderNavAuth(user) {
    const loginBtn = document.getElementById('loginBtnNav');
    const avatar = document.getElementById('userAvatarNav');
    if (!loginBtn || !avatar) return;

    if (!user) {
        loginBtn.style.display = 'inline-flex';
        avatar.style.display = 'none';
        return;
    }

    loginBtn.style.display = 'none';
    avatar.style.display = 'flex';

    const meta = user.user_metadata || {};
    if (meta.avatar_url) {
        avatar.innerHTML = `<img src="${meta.avatar_url}" alt="avatar" onerror="this.parentElement.textContent='?';this.parentElement.style.background='var(--color-gold)';">`;
    } else {
        const name = meta.username || (user.email || '?').charAt(0);
        avatar.textContent = String(name).charAt(0).toUpperCase();
    }
    avatar.title = meta.username ? `已登录：${meta.username}` : '账户中心';
}

// ========== 初始化 ==========
supabase.auth.getSession().then(({ data: { session } }) => {
    renderNavAuth(session ? session.user : null);
});

// ========== 监听登录状态变化 ==========
supabase.auth.onAuthStateChange((event, session) => {
    renderNavAuth(session ? session.user : null);
});
