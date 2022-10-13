const Mock = require('mockjs')

const users = [];
for(let i = 0;i < 20;i++) {
  users.push(Mock.mock({
    id: '@id',
    name: '@cname',
    'age|10-100': 100
  }))
}

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
