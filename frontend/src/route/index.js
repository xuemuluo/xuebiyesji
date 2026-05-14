import { createRouter, createWebHistory } from 'vue-router';
import store from '@/utils/store.js';
import * as utils from '@/utils/utils.js';

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/LoginPage.vue'),
    meta: {
      title: 'LEAF-SMS - 学生学籍管理系统',
      requiresAuth: false
    }
  },

  {
    path: '/',
    name: 'HomePage',
    component: () => import('@/components/IndexLayout.vue'),
    meta: {
      title: 'Leaf SMS - 学生学籍管理系统',
      requiresAuth: false
    }
  },

  {
    path: '/admin',
    component: () => import('@/components/AdminLayout.vue'),
    meta: { requiresAuth: true, role: 'ADMIN' },
    children: [
      {
        path: '',
        name: 'AdminDashboard',
        component: () => import('@/views/Admin/DashboardPage.vue'),
        meta: {
          title: '控制�?- Leaf SMS',
          requiresAuth: true,
          role: 'ADMIN'
        }
      },
      {
        path: 'students',
        name: 'StudentManagement',
        component: () => import('@/views/Admin/student/StudentManagement.vue'),
        meta: {
          title: '学生管理 - Leaf SMS',
          requiresAuth: true,
          role: 'ADMIN'
        }
      },
      {
        path: 'students/:studentId',
        name: 'StudentDetailPage',
        component: () => import('@/views/Admin/student/StudentDetailPage.vue'),
        meta: {
          title: '学生详情 - Leaf SMS',
          requiresAuth: true,
          role: 'ADMIN'
        }
      },
      {
        path: 'students/:studentId/edit',
        name: 'StudentEditPage',
        component: () => import('@/views/Admin/student/StudentEditPage.vue'),
        meta: {
          title: '编辑学生 - Leaf SMS',
          requiresAuth: true,
          role: 'ADMIN'
        }
      },
      {
        path: 'classes',
        name: 'ClassManagement',
        component: () => import('@/views/Admin/class/ClassManagement.vue'),
        meta: {
          title: '班级管理 - Leaf SMS',
          requiresAuth: true,
          role: 'ADMIN'
        }
      },
      {
        path: 'classes/:classId',
        name: 'ClassDetailPage',
        component: () => import('@/views/Admin/class/ClassDetailPage.vue'),
        meta: {
          title: '班级详情 - Leaf SMS',
          requiresAuth: true,
          role: 'ADMIN'
        }
      },
      {
        path: 'classes/:classId/edit',
        name: 'ClassEditPage',
        component: () => import('@/views/Admin/class/ClassEditPage.vue'),
        meta: {
          title: '编辑班级 - Leaf SMS',
          requiresAuth: true,
          role: 'ADMIN'
        }
      },
      {
        path: 'changes',
        name: 'StudentChangeManagement',
        component: () => import('@/views/Admin/change/StudentChangeManagement.vue'),
        meta: {
          title: '学籍变动 - Leaf SMS',
          requiresAuth: true,
          role: 'ADMIN'
        }
      },
      {
        path: 'changes/:changeId',
        name: 'StudentChangeDetailPage',
        component: () => import('@/views/Admin/change/StudentChangeDetailPage.vue'),
        meta: {
          title: '学籍变动详情 - Leaf SMS',
          requiresAuth: true,
          role: 'ADMIN'
        }
      },
      {
        path: 'users',
        name: 'UserManagement',
        component: () => import('@/views/Admin/UserManagement.vue'),
        meta: {
          title: '用户管理 - Leaf SMS',
          requiresAuth: true,
          role: 'ADMIN'
        }
      },
      {
        path: 'users/:userId',
        name: 'UserDetailPage',
        component: () => import('@/views/Admin/UserDetailPage.vue'),
        meta: {
          title: '用户详情 - Leaf SMS',
          requiresAuth: true,
          role: 'ADMIN'
        }
      },
      {
        path: 'users/:userId/edit',
        name: 'UserEditPage',
        component: () => import('@/views/Admin/UserEditPage.vue'),
        meta: {
          title: '编辑用户 - Leaf SMS',
          requiresAuth: true,
          role: 'ADMIN'
        }
      },
      {
        path: 'logs',
        name: 'OperationLogs',
        component: () => import('@/views/Admin/LogsPage.vue'),
        meta: {
          title: '操作日志 - Leaf SMS',
          requiresAuth: true,
          role: 'ADMIN'
        }
      },
      {
        path: 'profile',
        name: 'ProfilePage',
        component: () => import('@/views/Admin/ProfilePage.vue'),
        meta: {
          title: '个人资料 - Leaf SMS',
          requiresAuth: true,
          role: 'ADMIN'
        }
      }
    ]
  },

  {
    path: '/academic',
    component: () => import('@/components/AcademicLayout.vue'),
    meta: { requiresAuth: true, role: 'ACADEMIC' },
    children: [
      {
        path: '',
        name: 'AcademicDashboard',
        component: () => import('@/views/academic/DashboardPage.vue'),
        meta: {
          title: '控制�?- Leaf SMS',
          requiresAuth: true,
          role: 'ACADEMIC'
        }
      },
      {
        path: 'students',
        name: 'AcademicStudentManagement',
        component: () => import('@/views/academic/student/StudentManagement.vue'),
        meta: {
          title: '学生管理 - Leaf SMS',
          requiresAuth: true,
          role: 'ACADEMIC'
        }
      },
      {
        path: 'students/:studentId',
        name: 'AcademicStudentDetailPage',
        component: () => import('@/views/academic/student/StudentDetailPage.vue'),
        meta: {
          title: '学生详情 - Leaf SMS',
          requiresAuth: true,
          role: 'ACADEMIC'
        }
      },
      {
        path: 'students/:studentId/edit',
        name: 'AcademicStudentEditPage',
        component: () => import('@/views/academic/student/StudentEditPage.vue'),
        meta: {
          title: '编辑学生 - Leaf SMS',
          requiresAuth: true,
          role: 'ACADEMIC'
        }
      },
      {
        path: 'changes',
        name: 'AcademicChangeManagement',
        component: () => import('@/views/academic/change/ChangeManagement.vue'),
        meta: {
          title: '学籍变动 - Leaf SMS',
          requiresAuth: true,
          role: 'ACADEMIC'
        }
      },
      {
        path: 'changes/:changeId',
        name: 'AcademicChangeDetailPage',
        component: () => import('@/views/academic/change/ChangeDetailPage.vue'),
        meta: {
          title: '学籍变动详情 - Leaf SMS',
          requiresAuth: true,
          role: 'ACADEMIC'
        }
      },
      {
        path: 'classes',
        name: 'AcademicClassManagement',
        component: () => import('@/views/academic/class/ClassManagement.vue'),
        meta: {
          title: '班级管理 - Leaf SMS',
          requiresAuth: true,
          role: 'ACADEMIC'
        }
      },
      {
        path: 'classes/:classId',
        name: 'AcademicClassDetailPage',
        component: () => import('@/views/academic/class/ClassDetailPage.vue'),
        meta: {
          title: '班级详情 - Leaf SMS',
          requiresAuth: true,
          role: 'ACADEMIC'
        }
      },
      {
        path: 'classes/:classId/edit',
        name: 'AcademicClassEditPage',
        component: () => import('@/views/academic/class/ClassEditPage.vue'),
        meta: {
          title: '编辑班级 - Leaf SMS',
          requiresAuth: true,
          role: 'ACADEMIC'
        }
      },
      {
        path: 'reports',
        name: 'AcademicReports',
        component: () => import('@/views/academic/ReportsPage.vue'),
        meta: {
          title: '统计报表 - Leaf SMS',
          requiresAuth: true,
          role: 'ACADEMIC'
        }
      },
      {
        path: 'profile',
        name: 'AcademicProfile',
        component: () => import('@/views/academic/ProfilePage.vue'),
        meta: {
          title: '个人资料 - Leaf SMS',
          requiresAuth: true,
          role: 'ACADEMIC'
        }
      }
    ]
  },

  {
    path: '/headteacher',
    component: () => import('@/components/HeadTeacherLayout.vue'),
    meta: { requiresAuth: true, role: 'HEADTEACHER' },
    children: [
      {
        path: '',
        name: 'HeadTeacherDashboard',
        component: () => import('@/views/headteacher/DashboardPage.vue'),
        meta: {
          title: '工作�?- Leaf SMS',
          requiresAuth: true,
          role: 'HEADTEACHER'
        }
      },
      {
        path: 'students',
        name: 'HeadTeacherStudents',
        component: () => import('@/views/headteacher/StudentsPage.vue'),
        meta: {
          title: '学生列表 - Leaf SMS',
          requiresAuth: true,
          role: 'HEADTEACHER'
        }
      },
      {
        path: 'students/:studentId',
        name: 'HeadTeacherStudentArchiveDetail',
        component: () => import('@/views/headteacher/StudentArchiveDetailPage.vue'),
        meta: {
          title: '学生档案 - Leaf SMS',
          requiresAuth: true,
          role: 'HEADTEACHER'
        }
      },
      {
        path: 'attendance',
        name: 'HeadTeacherAttendance',
        component: () => import('@/views/headteacher/AttendancePage.vue'),
        meta: {
          title: '考勤管理 - Leaf SMS',
          requiresAuth: true,
          role: 'HEADTEACHER'
        }
      },
      {
        path: 'performance',
        name: 'HeadTeacherPerformance',
        component: () => import('@/views/headteacher/PerformancePage.vue'),
        meta: {
          title: '成绩管理 - Leaf SMS',
          requiresAuth: true,
          role: 'HEADTEACHER'
        }
      },
      {
        path: 'student-archives',
        name: 'HeadTeacherArchives',
        component: () => import('@/views/headteacher/ArchivesPage.vue'),
        meta: {
          title: '学籍档案 - Leaf SMS',
          requiresAuth: true,
          role: 'HEADTEACHER'
        }
      },
      {
        path: 'student-changes',
        name: 'HeadTeacherChanges',
        component: () => import('@/views/headteacher/ChangesPage.vue'),
        meta: {
          title: '变动记录 - Leaf SMS',
          requiresAuth: true,
          role: 'HEADTEACHER'
        }
      },
      {
        path: 'student-changes/:changeId',
        name: 'HeadTeacherChangeDetail',
        component: () => import('@/views/headteacher/ChangeDetailPage.vue'),
        meta: {
          title: '变动详情 - Leaf SMS',
          requiresAuth: true,
          role: 'HEADTEACHER'
        }
      },
      {
        path: 'messages',
        name: 'HeadTeacherMessages',
        component: () => import('@/views/headteacher/MessagesPage.vue'),
        meta: {
          title: '消息通知 - Leaf SMS',
          requiresAuth: true,
          role: 'HEADTEACHER'
        }
      },
      {
        path: 'profile',
        name: 'HeadTeacherProfile',
        component: () => import('@/views/headteacher/ProfilePage.vue'),
        meta: {
          title: '个人资料 - Leaf SMS',
          requiresAuth: true,
          role: 'HEADTEACHER'
        }
      }
    ]
  },

  {
    path: '/teacher',
    component: () => import('@/components/TeacherLayout.vue'),
    meta: { requiresAuth: true, role: 'TEACHER' },
    children: [
      {
        path: '',
        name: 'TeacherDashboard',
        component: () => import('@/views/Teacher/DashboardPage.vue'),
        meta: {
          title: '工作�?- Leaf SMS',
          requiresAuth: true,
          role: 'TEACHER'
        }
      },
      {
        path: 'classes',
        name: 'TeacherClasses',
        component: () => import('@/views/Teacher/ClassesPage.vue'),
        meta: {
          title: '任教班级 - Leaf SMS',
          requiresAuth: true,
          role: 'TEACHER'
        }
      },
      {
        path: 'students',
        name: 'TeacherStudents',
        component: () => import('@/views/Teacher/StudentsPage.vue'),
        meta: {
          title: '学生名单 - Leaf SMS',
          requiresAuth: true,
          role: 'TEACHER'
        }
      },
      {
        path: 'students/:studentId',
        name: 'TeacherStudentDetail',
        component: () => import('@/views/Teacher/StudentDetailPage.vue'),
        meta: {
          title: '学生详情 - Leaf SMS',
          requiresAuth: true,
          role: 'TEACHER'
        }
      },
      {
        path: 'grades',
        name: 'TeacherGrades',
        component: () => import('@/views/Teacher/GradesPage.vue'),
        meta: {
          title: '成绩录入 - Leaf SMS',
          requiresAuth: true,
          role: 'TEACHER'
        }
      },
      {
        path: 'attendance',
        name: 'TeacherAttendance',
        component: () => import('@/views/Teacher/AttendancePage.vue'),
        meta: {
          title: '考勤记录 - Leaf SMS',
          requiresAuth: true,
          role: 'TEACHER'
        }
      },
      {
        path: 'messages',
        name: 'TeacherMessages',
        component: () => import('@/views/Teacher/MessagesPage.vue'),
        meta: {
          title: '消息通知 - Leaf SMS',
          requiresAuth: true,
          role: 'TEACHER'
        }
      },
      {
        path: 'profile',
        name: 'TeacherProfile',
        component: () => import('@/views/Teacher/ProfilePage.vue'),
        meta: {
          title: '个人资料 - Leaf SMS',
          requiresAuth: true,
          role: 'TEACHER'
        }
      }
    ]
  },

  {
    path: '/parent',
    component: () => import('@/components/ParentLayout.vue'),
    meta: { requiresAuth: true, role: 'PARENT' },
    children: [
      {
        path: '',
        name: 'ParentDashboard',
        component: () => import('@/views/parent/DashboardPage.vue'),
        meta: {
          title: '首页 - Leaf SMS',
          requiresAuth: true,
          role: 'PARENT'
        }
      },
      {
        path: 'child-changes',
        name: 'ParentChildChanges',
        component: () => import('@/views/parent/ChildChangesPage.vue'),
        meta: {
          title: '变动记录 - Leaf SMS',
          requiresAuth: true,
          role: 'PARENT'
        }
      },
      {
        path: 'grades',
        name: 'ParentGrades',
        component: () => import('@/views/parent/GradesPage.vue'),
        meta: {
          title: '成绩查询 - Leaf SMS',
          requiresAuth: true,
          role: 'PARENT'
        }
      },
      {
        path: 'attendance',
        name: 'ParentAttendance',
        component: () => import('@/views/parent/AttendancePage.vue'),
        meta: {
          title: '考勤记录 - Leaf SMS',
          requiresAuth: true,
          role: 'PARENT'
        }
      },
      {
        path: 'messages',
        name: 'ParentMessages',
        component: () => import('@/views/parent/MessagesPage.vue'),
        meta: {
          title: '消息通知 - Leaf SMS',
          requiresAuth: true,
          role: 'PARENT'
        }
      },
      {
        path: 'profile',
        name: 'ParentProfile',
        component: () => import('@/views/parent/SettingsPage.vue'),
        meta: {
          title: '个人资料 - Leaf SMS',
          requiresAuth: true,
          role: 'PARENT'
        }
      }
    ]
  },

  {
    path: '/user-guide',
    name: 'UserGuidePage',
    component: () => import('@/views/index/UserGuidePage.vue'),
    meta: {
      title: '使用指南 - Leaf SMS',
      requiresAuth: false
    }
  },
  {
    path: '/contact-us',
    name: 'ContactUsPage',
    component: () => import('@/views/index/ContactUsPage.vue'),
    meta: {
      title: '联系我们 - Leaf SMS',
      requiresAuth: false
    }
  },
  {
    path: '/faq',
    name: 'FAQPage',
    component: () => import('@/views/index/FaqPage.vue'),
    meta: {
      title: '常见问题 - Leaf SMS',
      requiresAuth: false
    }
  },
  {
    path: '/author-info',
    name: 'AuthorInfoPage',
    component: () => import('@/views/index/AuthorInfoPage.vue'),
    meta: {
      title: '作者介�?- Leaf SMS',
      requiresAuth: false
    }
  },
  {
    path: '/privacy-policy',
    name: 'PrivacyPolicyPage',
    component: () => import('@/views/index/PrivacyPolicyPage.vue'),
    meta: {
      title: '隐私保护 - Leaf SMS',
      requiresAuth: false
    }
  },

  { path: '/:pathMatch(.*)*', redirect: '/' }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach(async (to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }

  if (to.meta.requiresAuth) {
    const isAuthenticated = await store.checkAuthStatus();

    if (!isAuthenticated) {
      store.clearUser();
      next('/login');
      return;
    }

    if (process.env.NODE_ENV === 'development') {
      next();
      return;
    }

    if (!store.state.user) {
      try {
        await store.fetchCurrentUser();
      } catch (error) {
        store.clearUser();
        next('/login');
        return;
      }
    }

    if (to.meta.role && store.state.user?.roleCode !== to.meta.role) {
      const rolePaths = {
        'ADMIN': '/admin',
        'ACADEMIC': '/academic',
        'HEADTEACHER': '/headteacher',
        'TEACHER': '/teacher',
        'PARENT': '/parent'
      };
      const userRole = store.state.user?.roleCode;
      if (userRole && rolePaths[userRole]) {
        next(rolePaths[userRole]);
      } else {
        next('/');
      }
      return;
    }
  }

  if (to.path === '/login' && utils.isLoggedIn()) {
    const isAuthenticated = await store.checkAuthStatus();
    if (isAuthenticated) {
      const userRole = store.state.user?.roleCode;
      const rolePaths = {
        'ADMIN': '/admin',
        'ACADEMIC': '/academic',
        'HEADTEACHER': '/headteacher',
        'TEACHER': '/teacher',
        'PARENT': '/parent'
      };
      if (userRole && rolePaths[userRole]) {
        next(rolePaths[userRole]);
      } else {
        next('/');
      }
      return;
    } else {
      store.clearUser();
    }
  }

  next();
});

export default router;
