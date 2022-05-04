const express = require('express');
const router = express.Router();



index_rt = ['/', '/index', '/auth/index', '/login'];
router.get(index_rt, (req, res) => {
  if (req.session.username) {
    return res.redirect('/homepage');
  }
  else {
    res.render('index');
  }
});



let register_rt = ['/register', '/auth/Register'];
router.get(register_rt, (req, res) => {
  res.render('register');
});




let homepage_rt = ['/auth/homepage', '/homepage', '/homepage.html', '/auth/homepage.html'];
router.get(homepage_rt, (req, res) => {
  if (!req.session.username) {
    return res.status(401).render('index', {
      message: 'User not logged in!'
    });
  }
  return res.status(200).render('homepage', {
    post: {
      username: req.session.username,
      score: req.session.score
    }
  });
});


let scoreboard_rt = ['/auth/leader_board', '/leader_board', '/leader_board.html', 'auth/leader_board.html'];
router.get(scoreboard_rt, (req, res) => {
  if (!req.session.username) {
    return res.status(401).render('index', {
      message: 'User not logged in!'
    });
  }
  return res.status(200).render('leader_board', {
    post: {
      username: req.session.username,
      score: req.session.score
    }
  });
});



let about_rt = ['/about'];
router.get(about_rt, (req, res) => {
  res.render('about', {
    post: {
      username: req.session.username,
      score: req.session.score
    }
  });
});


let ctg_learn_rt = ['/auth/ctg_learn', '/ctg_learn', '/ctg_learn.html'];
router.get(ctg_learn_rt, (req, res) => {
  if (!req.session.username) {
    return res.status(401).render('index', {
      message: 'User not logged in!'
    });
  }
  return res.status(200).render('ctg_learn', {
    post: {
      username: req.session.username,
      score: req.session.score
    }
  });
});


let learn_rt = ['/auth/learn', '/learn', '/learn.html'];
router.get(learn_rt, (req, res) => {
  if (!req.session.username) {
    return res.status(401).render('index', {
      message: 'User not logged in!'
    });
  }
  return res.status(200).render('learn', {
    post: {
      username: req.session.username,
      score: req.session.score
    }
  });
});



let ctg_play_rt = ['/auth/ctg_play', '/ctg_play', '/ctg_play.html'];
router.get(ctg_play_rt, (req, res) => {
  if (!req.session.username) {
    return res.status(401).render('index', {
      message: 'User not logged in!'
    });
  }
  return res.status(200).render('ctg_play', {
    post: {
      username: req.session.username,
      score: req.session.score
    }
  });
});


let play_rt = ['/auth/play', '/play', '/play.html'];
router.get(play_rt, (req, res) => {
  if (!req.session.username) {
    return res.status(401).render('index', {
      message: 'User not logged in!'
    });
  }
  return res.status(200).render('play', {
    post: {
      username: req.session.username,
      score: req.session.score
    }
  });
});


//settings-------------------------------------------------
let settings_rt = ['/auth/settings', '/settings', '/settings.html'];
router.get(settings_rt, (req, res) => {
  if (!req.session.username) {
    return res.status(401).render('index', {
      message: 'User not logged in!'
    });
  }
  return res.status(200).render('settings', {
    post: {
      username: req.session.username,
      score: req.session.score
    }
  });
});



let settings_chng_username_rt = ['/auth/change_username', '/change_username', '/change_username.html'];
router.get(settings_chng_username_rt, (req, res) => {
  if (!req.session.username) {
    return res.status(401).render('index', {
      message: 'User not logged in!'
    });
  }
  let err = "";
  if (req.session.errormsg) {
    err = req.session.errormsg;
    delete req.session.errormsg;
  }
  return res.status(200).render('change_username', {
    post: {
      username: req.session.username,
      score: req.session.score,
      err: err
    }
  });
});


let settings_chng_pass_rt = ['/auth/change_pass', '/change_pass', '/change_pass.html'];
router.get(settings_chng_pass_rt, (req, res) => {
  if (!req.session.username) {
    return res.status(401).render('index', {
      message: 'User not logged in!'
    });
  }
  let err = "";
  if (req.session.errormsg) {
    err = req.session.errormsg;
    delete req.session.errormsg;
  }
  return res.status(200).render('change_pass', {
    post: {
      username: req.session.username,
      score: req.session.score,
      err: err
    }
  });
});


let settings_chng_lang_rt = ['/auth/change_lng', '/change_lng', '/change_lng.html'];
router.get(settings_chng_lang_rt, (req, res) => {
  if (!req.session.username) {
    return res.status(401).render('index', {
      message: 'User not logged in!'
    });
  }
  return res.status(200).render('change_lng', {
    post: {
      username: req.session.username,
      score: req.session.score
    }
  });
});



let settings_reset_score_rt = ['/score_reset', '/auth/score_reset'];
router.get(settings_reset_score_rt, (req, res) => {
  if (!req.session.username) {
    return res.status(401).render('index', {
      message: 'User not logged in!'
    });
  }
  return res.status(200).render('score_reset', {
    post: {
      username: req.session.username,
      score: req.session.score
    }
  });
});

//end settings------------------------------------------------------------



let save_score_rt = ['/save_score', '/auth/save_score'];
router.get(save_score_rt, (req, res) => {
  if (!req.session.username) {
    return res.status(401).render('index', {
      message: 'User not logged in!'
    });
  }
  return res.status(200).render('homepage', {
    post: {
      username: req.session.username,
      score: req.session.score
    }
  });
});




let logout_rt = ['/auth/logout', '/logout'];
router.get(logout_rt, (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return console.log(err);
    }
    console.log("Session is over");
    res.redirect('/');
  });
});



router.get('*', (req, res) => {
  res.status(404).send('<div style="text-align: center; font-size: 26px; margin-top: 40px">Page does not exist! <a href="/index">click here to return</a></div>');
});






module.exports = router;
