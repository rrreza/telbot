import type { Context, Telegraf } from "telegraf";
import { logger } from "../utils/logger";

/**
 * Register all bot commands and event handlers.
 * Add your custom commands here.
 */
export function registerCommands(bot: Telegraf): void {
	// /start - Entry point when a user first interacts with the bot
	bot.command("start", handleStart);

	// /help - Show available commands
	bot.command("help", handleHelp);

	// Handle any text message that isn't a command
	bot.on("message", handleMessage);

	// Global error handler
	bot.catch((err, ctx) => {
		logger.error("متاسفانه مشکلی در دستیار رخ داده است و قادر به پاسخگویی نیست", { error: err, update: ctx.update });
	});
}

async function handleStart(ctx: Context): Promise<void> {
	const startText = [
  `*🎉 به دستیار اینترنتی مرکز آموزش فنی و حرفه‌ای* _علامه بهلول گنابادی_ خوش آمدید`,
  ``,
  `📌 برای ادامه، یکی از گزینه‌های زیر را انتخاب کنید`
].join("\n");
	
await ctx.reply( startText,  { parse_mode: "Markdown" });
}

async function handleHelp(ctx: Context): Promise<void> {
	const helpText = `
📞 *راه‌های ارتباط با ما*

برای راهنمایی و کسب اطلاعات بیشتر، می‌توانید از راه‌های زیر با ما در تماس باشید:

• تلفن تماس: [۰۵۱-۵۷۲۸۸۳۵۱](tel:05157288351)
• وب‌سایت: [مرکز آموزش فنی و حرفه‌ای علامه بهلول گنابادی](https://khrtvto.ir/portal-markaz7/)
آدرس: گناباد - شهرک آیت‌الله مدنی(شهرک بیلند) - مرکز آموزش فنی و حرفه‌ای گناباد
🕐 *ساعت پاسخگویی:* شنبه تا چهارشنبه، ۷:۳۰ صبح تا ۱۳ بعد از ظهر
`;
	


	await ctx.reply(helpText, { parse_mode: "Markdown" });
}

async function handleMessage(ctx: Context): Promise<void> {
	const otherText = `


برای راهنمایی و کسب اطلاعات بیشتر، می‌توانید از راه‌های زیر با ما در تماس باشید:

• تلفن تماس: [۰۵۱-۵۷۲۸۸۳۵۱](tel:05157288351)
• وب‌سایت: [مرکز آموزش فنی و حرفه‌ای علامه بهلول گنابادی](https://khrtvto.ir/portal-markaz7/)
آدرس: گناباد - شهرک آیت‌الله مدنی(شهرک بیلند) - مرکز آموزش فنی و حرفه‌ای گناباد
🕐 *ساعت پاسخگویی:* شنبه تا چهارشنبه، ۷:۳۰ صبح تا ۱۳ بعد از ظهر
`;
	
// دکمه بازگشت به منوی اصلی
const backButton = {
  reply_markup: {
    inline_keyboard: [
      [{ text: '🔙 بازگشت به منوی اصلی', callback_data: 'back_to_start' }]
    ]
  }
};

	await ctx.reply(otherText, { parse_mode: "Markdown" }, ...backButton);
}
}
