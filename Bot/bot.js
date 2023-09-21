import { Telegraf } from "telegraf";

const TOKEN = "5995054254:AAEA_aeDpsnIHBqPAOVrZBb4z_a6OuVA7A0";
const bot = new Telegraf(TOKEN);
const web_link = "https://zakaz-tgbotapp.vercel.app/";

bot.start((ctx) => {
  ctx.reply(`${ctx.telegram}`, {
    reply_markup: {
      inline_keyboard: [[{ text: "Bizning sayt", web_app: { url: web_link } }]],
      resize_keyboard: false
    },
  }).then(r => console.log(ctx.chat));
});

bot.launch();
