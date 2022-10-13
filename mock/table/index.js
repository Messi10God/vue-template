const users = [
  {
    id: '1',
    name: '黄乘车你',
    age: '27',
  },
  {
    id: '2',
    name: '小吖',
    age: '21',
  },
  {
    id: '3',
    name: '张三',
    age: '53',
  },
  {
    id: '4',
    name: '李四',
    age: '53',
  },
  {
    id: '5',
    name: '王五',
    age: '53',
  },
  {
    id: '6',
    name: '赵六',
    age: '53',
  },
];

module.exports = [
  {
    url: '/getUsers',
    type: 'get',
    response: (config) => {
      const { age, name, pageIndex, pageSize } = config.query;
      let data = users;
      if (age || name) {
        data = data.filter(
          (t) => t.age.includes(age) || t.name.includes(name)
        );
      }
      let new_data = data.slice(
        (pageIndex - 1) * pageSize,
        pageIndex * pageSize
      );
      return {
        success: true,
        total: data.length,
        data: new_data,
        pageIndex: Number(pageIndex),
        pageSize: Number(pageSize),
      };
    }
  }
]
