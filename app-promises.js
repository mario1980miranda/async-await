const users = [{
    id: 1,
    name: 'Mario',
    schoolId: 101
}, {
    id: 2,
    name: 'Jen',
    schoolId: 999
}];

const grades = [{
    id: 1,
    schoolId: 101,
    grade: 86
},{
    id: 2,
    schoolId: 999,
    grade: 100
},{
    id: 3,
    schoolId: 101,
    grade: 80
}];

const getUser = (id) => {
    return new Promise((resolve, reject) => {
        const user = users.find((user) => user.id === id);

        if (user) {
            resolve(user);
        } else {
            reject(`Unable to find user with id of ${id}`);
        }
    });
};

const getGrades = (schoolId) => {
    return new Promise((resolve, reject) => {
        resolve(grades.filter((grade) => grade.schoolId === schoolId));
    });
};

const getStatus = (userId) => {
    let user;
    return getUser(userId).then((tempUser) => {
        user = tempUser;
        return getGrades(user.schoolId);
    }).then((grades) => {
        let average = 0;

        if (grades.length > 0) {
            average = grades.map((grade) => grade.grade).reduce((a, b) => a + b) / grades.length;
        }

        return `${user.name} has a ${average}% in the class.`
    });
};

const getStatusAlt = async (userId) => {
    // throw new Error('This is an error to trigger reject');
    // return 'Mike';
    const user = await getUser(userId);
    const grades = await getGrades(user.schoolId);

    let average = 0;

    if (grades.length > 0) {
        average = grades.map((grade) => grade.grade).reduce((a, b) => a + b) / grades.length;
    }

    return `${user.name} has a ${average}% in the class.`
};

getStatusAlt(2).then((status) => {
    console.log(status);
}).catch((e) => {
    console.log(e);
});

/*********** begin comments on async await 
// especial type of function that uses these keywords to AWAYS return a Promise. The functions below are alike:
const getStatusUsual = (userId) => {
    return 'Mike';
};
const getStatusAlt = async (userId) => {
    return 'Mike';
};
() => {
    return new Promise((resolve, reject) => {
        resolve('Mike');
    });
}
console.log(getStatusUsual());
console.log(getStatusAlt());

*********** end on comments Async Await*/
// const getStatusAlt = async (userId) => {
//     const user = await getUser(userId);
//     const grades = await getGrades(user.schoolId);
//     let average = 0;
  
//     if (grades.length > 0) {
//       average = grades.map((grade) => grade.grade).reduce((a, b) => a + b) / grades.length;
//     } 
  
//     return `${user.name} has a ${average}% in the class.`;
//   };

// getStatusAlt(1).then((status) => {
//     console.log(status);
// }).catch((e) => {
//     console.log(e);
// });

// getStatus(123).then((status) => {
//     console.log(status);
// }).catch((e) => {
//     console.log(e);
// });

// getGrades(999).then((grades) => {
//     console.log(grades);
// }).catch((e) => {
//     console.log(e);
// });

// getUser(1).then((user) => {
//     console.log(user);
// }).catch((e) => {
//     console.log(e);
// });