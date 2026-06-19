import type { Context, Telegraf } from "telegraf";
import { logger } from "../utils/logger";

// ---------- متون ثابت برای نمایش در پیام‌ها ----------
const contactInfo = `
📞 *راه‌های ارتباط با ما*

برای راهنمایی و کسب اطلاعات بیشتر، می‌توانید از راه‌های زیر با ما در تماس باشید:

• تلفن تماس: [۰۵۱-۵۷۲۸۸۳۵۱](tel:05157288351)
• وب‌سایت: [مرکز آموزش فنی و حرفه‌ای علامه بهلول گنابادی](https://khrtvto.ir/portal-markaz7/)
• آدرس: گناباد - شهرک آیت‌الله مدنی(شهرک بیلند) - مرکز آموزش فنی و حرفه‌ای گناباد

🕐 *ساعت پاسخگویی:* شنبه تا چهارشنبه، ۷:۳۰ صبح تا ۱۳ بعد از ظهر
`;

const educationText = `
📚 *لیست دوره‌های جاری مرکز*
[مشاهده دوره‌ها](https://khrtvto.ir/portals/%D9%85%D8%B1%DA%A9%D8%B2-%D8%A2%D9%85%D9%88%D8%B2%D8%B4-%D9%81%D9%86%DB%8C-%D9%88-%D8%AD%D8%B1%D9%81%D9%87-%D8%A7%DB%8C-%D8%B4%D9%85%D8%A7%D8%B1%D9%87-7-%DA%AF%D9%86%D8%A7%D8%A8%D8%A7%D8%AF-47/Frm_KarAmoozCourses.aspx)

📝 *ثبت نام در پورتال آموزش*
[ورود به پورتال ثبت‌نام](https://reg.irantvto.ir/course)

🌐 *پورتال آموزش*
[ورود به پورتال اصلی](https://www.portaltvto.com/)

💰 *محاسبه تعرفه خدمات آموزشی*
[محاسبه آنلاین تعرفه](https://mojavez.irantvto.ir/educalc)
`;

const examText = `
🎯 *کارت آزمون*
[مشاهده و دریافت کارت](https://azmoon.portaltvto.com/card/card/index/1/80)

📊 *نتایج آزمون*
[مشاهده نتایج](https://azmoon.portaltvto.com/result/result/index/1/80)

💳 *پرداخت هزینه صدور گواهینامه*
[پرداخت آنلاین](https://pay.portaltvto.com/pay/licence)

🖨️ *دریافت پرینت گواهینامه*
[دریافت پرینت](https://azmoon.portaltvto.com/estelam/estelam)
`;

const otherText = `
🏅 *مسابقات ملی مهارت*
[مشاهده وبسایت مسابقات](https://skill.irantvto.ir)

📋 *استانداردهای آموزشی*
[مشاهده استانداردها](https://rpc.irantvto.ir/)
`;

// ---------- دکمه‌های منوی اصلی ----------
const mainMenuKeyboard = {
  reply_markup: {
    inline_keyboard: [
      [{ text: '📚 آموزش', callback_data: 'menu_education' }],
      [{ text: '📝 آزمون', callback_data: 'menu_exam' }],
      [{ text: '📋 سایر', callback_data: 'menu_other' }],
      [{ text: '📞 ارتباط با ما', callback_data: 'menu_contact' }]
    ]
  }
};

// دکمه بازگشت به منوی اصلی
const backButton = {
  reply_markup: {
    inline_keyboard: [
      [{ text: '🔙 بازگشت به منوی اصلی', callback_data: 'back_to_start' }]
    ]
  }
};

// ---------- ثبت دستورات و اکشن‌ها ----------
export function registerCommands(bot: Telegraf): void {
	bot.command("start", handleStart);
	bot.command("help", handleHelp);
	bot.on("message", handleMessage);

	// مدیریت کلیک روی دکمه‌های منو
	bot.action("menu_education", handleEducation);
	bot.action("menu_exam", handleExam);
	bot.action("menu_other", handleOther);
	bot.action("menu_contact", handleContact);
	bot.action("back_to_start", handleBackToStart);

	bot.catch((err, ctx) => {
		logger.error("خطا در ربات", { error: err, update: ctx.update });
	});
}

// ---------- توابع مدیریتی ----------
async function handleStart(ctx: Context): Promise<void> {
	const startText = [
		`*🎉 به دستیار اینترنتی مرکز آموزش فنی و حرفه‌ای* _علامه بهلول گنابادی_ خوش آمدید`,
		``,
		`📌 برای ادامه، یکی از گزینه‌های زیر را انتخاب کنید`
	].join("\n");
	
	await ctx.reply(startText, { 
		parse_mode: "Markdown", 
		...mainMenuKeyboard 
	});
}

async function handleHelp(ctx: Context): Promise<void> {
	await ctx.reply(contactInfo, { 
		parse_mode: "Markdown", 
		...backButton 
	});
}

async function handleMessage(ctx: Context): Promise<void> {
	// پاسخ به پیام‌های متنی معمولی (غیر از دستورات)
	await ctx.reply("لطفاً از دکمه‌های زیر استفاده کنید:", { 
		parse_mode: "Markdown", 
		...mainMenuKeyboard 
	});
}

// ---------- توابع مربوط به دکمه‌های منو ----------
async function handleEducation(ctx: Context): Promise<void> {
	await ctx.answerCbQuery();
	await ctx.reply(educationText, { 
		parse_mode: "Markdown", 
		...backButton 
	});
}

async function handleExam(ctx: Context): Promise<void> {
	await ctx.answerCbQuery();
	await ctx.reply(examText, { 
		parse_mode: "Markdown", 
		...backButton 
	});
}

async function handleOther(ctx: Context): Promise<void> {
	await ctx.answerCbQuery();
	await ctx.reply(otherText, { 
		parse_mode: "Markdown", 
		...backButton 
	});
}

async function handleContact(ctx: Context): Promise<void> {
	await ctx.answerCbQuery();
	// نمایش همان اطلاعات ارتباطی
	await ctx.reply(contactInfo, { 
		parse_mode: "Markdown", 
		...backButton 
	});
}

async function handleBackToStart(ctx: Context): Promise<void> {
	await ctx.answerCbQuery();
	const startText = [
		`*🎉 به دستیار اینترنتی مرکز آموزش فنی و حرفه‌ای* _علامه بهلول گنابادی_ خوش آمدید`,
		``,
		`📌 برای ادامه، یکی از گزینه‌های زیر را انتخاب کنید`
	].join("\n");
	
	await ctx.reply(startText, { 
		parse_mode: "Markdown", 
		...mainMenuKeyboard 
	});
}
