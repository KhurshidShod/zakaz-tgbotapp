import { Telegraf } from "telegraf";

const TOKEN = "5995054254:AAEA_aeDpsnIHBqPAOVrZBb4z_a6OuVA7A0";
const bot = new Telegraf(TOKEN);
const web_link = "https://zakaz-tgbotapp.vercel.app/";
let userID = '';
bot.start((ctx) => {
  ctx.reply(`Assalomu aleykum`, {
    reply_markup: {
      inline_keyboard: [[{ text: "Bizning sayt", web_app: { url: web_link } }]],
      resize_keyboard: true
    },
  }).then(r => userID = r);
});
export default userID;
bot.launch();
