

  enum Role  {
    SUPER_ADMIN =1 ,
    USER 
  };
  
  export const RoleLabels : {[key in Role] : string} = {
    [Role.SUPER_ADMIN] :'Super Admin',
    [Role.USER] : 'User'
  }

  export const months = [
    { value: "01", label: "January" },
    { value: "02", label: "February" },
    { value: "03", label: "March" },
    { value: "04", label: "April" },
    { value: "05", label: "May" },
    { value: "06", label: "June" },
    { value: "07", label: "July" },
    { value: "08", label: "August" },
    { value: "09", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" }
  ];
  
  export const years = Array.from(new Array(20), (val, index) => {
    const year = new Date().getFullYear() - index;
    return { value: year.toString(), label: year.toString() };
  });
  