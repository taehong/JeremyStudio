/**
 * @author JeremyJeong
 */

// TODO 이 있으면 끝 표시??
SceneManager.SceneConfig = {
	initialScene: {
		nextScenes: ['splashDigitalMedia'],
		prevScenes: [],
		context: null
	},
	splashDigitalMedia : {
		nextScenes: ['splashBrainstorm'],
		prevScenes: [],
		context: null
	},
	splashBrainstorm : {
		nextScenes: ['splashJeremyLab'],
		prevScenes: ['splashDigitalMedia'],
		context: null
	},
	splashJeremyLab : {
		nextScenes: ['splashCandleLight'],
		prevScenes: ['splashBrainstorm'],
		context: null
	},
	splashCandleLight : {
		nextScenes: ['menuMain'],
		prevScenes: ['splashJeremyLab'],
		context: null
	},
	menuMain : {
		nextScenes: ['menuSetting', 'menuHelp'],
		prevScenes: ['splashCandleLight'],
		context: null
	},
	menuSetting : {
		nextScenes: [],
		prevScenes: ['menuMain'],
		context: null
	},
	menuHelp : {
		nextScenes: [],
		prevScenes: ['menuMain'],
		context: null
	}
};