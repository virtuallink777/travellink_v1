import next from "next"

const PORT = Number(process.env.PORT) || 3000


  export const nextApp = next({
    dev: process.env.NODE_ENV !== "production",
    port: PORT
  })

  export const nexthandler = nextApp.getRequestHandler()