import Home from '../views/mainbox/home.vue'
import Center from '../views/mainbox/center.vue'
import Activity from '../views/mainbox/activity.vue'
import Manage from '../views/mainbox/manage.vue'
import UserList from '../views/usermanage/userList.vue'
import Record from '../views/usermanage/records.vue'
import CheckList from '../views/usermanage/checkList.vue'
import NotFound from '../views/NotFound.vue'
import StudentList from '../views/usermanage/studentList.vue'
import Homework from '../views/usermanage/homework.vue'
import Reference from '../views/usermanage/reference.vue'
import AddRecord from '../views/usermanage/addRecord.vue'
import EditRecord from '../views/usermanage/editRecord.vue'
import AddUser from '../views/usermanage/addUser.vue'
import addStudent from '@/views/usermanage/addStudent.vue'
import studentDetail from '@/views/usermanage/studentDetail.vue'
import editUser from '@/views/usermanage/editUser.vue'
import mealsList from '../views/usermanage/mealsList.vue'
import Courses from '../views/usermanage/courses.vue'

const routes = [

  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: '/activity',
    name: 'activity',
    component: Activity,
  },
  {
    path: '/courses',
    name: 'courses',
    component: Courses,
    meta: { permission: { resource: 'timetable', action: 'R' }}
  },
  {
    path: '/:pathMatch(.*)*',
    component: NotFound
  },

  {
    path: '/manage',
    name: 'manage',
    component: Manage,
    meta: { permission: { resource: 'user', action: 'C' }}
  },
  {
    path: '/center',
    name: 'center',
    component: Center
  },
  {
    path: '/manage/userlist',
    name: 'userlist',
    component: UserList,
  },
  {
    path: '/manage/checklist',
    name: 'checklist',
    component: CheckList,
  },
  {
    path: '/manage/mealslist',
    name: 'mealslist',
    component: mealsList,
  },
  {
    path: '/manage/studentlist',
    name: 'studentlist',
    component: StudentList,
  },
  {
    path: '/manage/records',
    name: 'record',
    component: Record,
  },
  {
    path: '/manage/addrecord',
    name: 'addrecord',
    component: AddRecord,
  },
  {
    path: '/manage/adduser',
    name: 'adduser',
    component: AddUser,
  },
  {
    path: '/manage/edituser/:id',
    name: 'edituser',
    component: editUser,
  },
  {
    path: '/manage/homework',
    name: 'homework',
    component: Homework,
  },
  {
    path: '/manage/reference',
    name: 'reference',
    component: Reference,
  },
  {
    path: '/manage/editrecord/:id',
    name: 'editrecord',
    component: EditRecord,
  },
  {
    path: '/manage/addstudent',
    name: 'addstudent',
    component: addStudent,
  },
  {
    path: '/manage/studentdetail',
    name: 'studentdetail',
    component: studentDetail,
  },

  {
    path: '/:pathMatch(.*)*',
    component: NotFound
  },

]

export default routes