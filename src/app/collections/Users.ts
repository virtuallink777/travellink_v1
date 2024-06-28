import { CollectionConfig } from "payload/types";

export const Users: CollectionConfig = {
  slug: "users",
  auth: {
    verify: {
      generateEmailHTML: ({ token }) => {
        return `<p>Hola, por favor haz clic en este enlace para confirmar tu cuenta:</p><p><a href="${process.env.NEXT_PUBLIC_SERVER_URL}/verify-email?token=${token}">Confirmar cuenta</a></p>`;
      },
    },
  },
  access: {
    read: () => true,
    create: () => true,
  },
  fields: [
    {
      name: "role",
      defaultValue: "user",
      required: true,
      type: "select",
      options: [
        {
          value: "user",
          label: "User",
        },
        {
          value: "admin",
          label: "Admin",
        },
      ],
    },
  ],
};
