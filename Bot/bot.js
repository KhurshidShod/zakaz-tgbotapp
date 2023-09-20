import { Telegraf } from "telegraf";

const TOKEN = '5995054254:AAEA_aeDpsnIHBqPAOVrZBb4z_a6OuVA7A0';
const bot = new Telegraf(TOKEN);

bot.start((ctx) => ctx.reply("Xurshid"));

bot.launch()