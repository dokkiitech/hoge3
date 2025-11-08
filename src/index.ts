import { Client, GatewayIntentBits, REST, Routes, ChatInputCommandInteraction } from 'discord.js';
import * as dotenv from 'dotenv';

dotenv.config();

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

// コマンド定義
const commands = [
  {
    name: 'address-search',
    description: '住所検索',
    options: [
          {
                "name": "zipcode",
                "description": "郵便番号",
                "type": 3,
                "required": true
          }
    ]
  }
];

// コマンドハンドラー
async function handleAddress-search(interaction: ChatInputCommandInteraction) {
  try {
    await interaction.deferReply();

    const baseUrl = process.env.BOT_BASE_URL_01!;
    let endpoint = '?zipcode={zipcode}';

    // コマンドオプションから値を取得してエンドポイントの変数を置換
    endpoint = endpoint.replace('{zipcode}', String(interaction.options.getString('zipcode') || ''));

    const url = new URL(endpoint, baseUrl);

    

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    

    const apiResponse = await fetch(url.toString(), {
      method: 'GET',
      headers,
    });

    if (!apiResponse.ok) {
      throw new Error(`API request failed: ${apiResponse.status}`);
    }

    const responseContent = await (async () => {
      const data = await apiResponse.json() as any;
const resultsAddress1 = data.results[0].address1;
const resultsAddress2 = data.results[0].address2;
const resultsAddress3 = data.results[0].address3;
const resultsKana1 = data.results[0].kana1;
const resultsKana2 = data.results[0].kana2;
const resultsKana3 = data.results[0].kana3;

return {
  content: `**住所1**: ${resultsAddress1}\n**住所2**: ${resultsAddress2}\n**住所3**: ${resultsAddress3}\n**カナ1**: ${resultsKana1}\n**カナ2**: ${resultsKana2}\n**カナ3**: ${resultsKana3}`
};
    })();

    await interaction.editReply(responseContent);
  } catch (error) {
    console.error('Error in handleAddress-search:', error);
    const errorMessage = 'エラーが発生しました。もう一度お試しください。';
    
    if (interaction.deferred) {
      await interaction.editReply(errorMessage);
    } else {
      await interaction.reply({ content: errorMessage, ephemeral: true });
    }
  }
}

client.on('ready', async () => {
  console.log(`✅ Logged in as ${client.user?.tag}!`);
  
  // スラッシュコマンドを登録
  try {
    console.log('🔄 Registering slash commands...');
    const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_BOT_TOKEN!);
    
    await rest.put(
      Routes.applicationCommands(process.env.DISCORD_APPLICATION_ID!),
      { body: commands }
    );
    
    console.log('✅ Successfully registered slash commands!');
  } catch (error) {
    console.error('❌ Error registering commands:', error);
  }
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const { commandName } = interaction;

  try {
    switch (commandName) {
      case 'address-search':
        await handleAddress-search(interaction);
        break;
      default:
        await interaction.reply({ content: 'Unknown command', ephemeral: true });
    }
  } catch (error) {
    console.error(`Error handling command ${commandName}:`, error);
    const errorMessage = { content: 'エラーが発生しました。', ephemeral: true };
    
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp(errorMessage);
    } else {
      await interaction.reply(errorMessage);
    }
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);
