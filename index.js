export async function getUserData(userId) {
  const user = await fetch(`/api/users/${userId}`)
  const rights = { reportStats: true, validate: true, };
  let data;
  switch (true) {
    case user.role == 'admin':
      data = {
        name: user.name,
        role: user.role,
        password: user.password,
        permissions: [],
      }
      Object.keys(rights).forEach(permission => {
        if (rights[permission]) {
          if (permission === 'reportStats') {
            data.permissions.push('report-stats')
          } else {
            data.permissions.push(permission);
          }
        }
      })
      break;
    case user.role == 'regular':
      data = {
        name: user.name,
        role: user.role,
      }
  }
  return data;
}