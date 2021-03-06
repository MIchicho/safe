/*******************************************************************************
    Copyright (c) 2013, KAIST.
    All rights reserved.

    Use is subject to license terms.

    This distribution may include materials developed by third parties.
 ******************************************************************************/

package kr.ac.kaist.jsaf.compiler.module

import kr.ac.kaist.jsaf.nodes._
import kr.ac.kaist.jsaf.nodes_util.{NodeUtil => NU, _}
import kr.ac.kaist.jsaf.scala_src.nodes._
import kr.ac.kaist.jsaf.compiler.module.{ModHelper => MH}
import java.util.HashMap

class ModFunWalker(env: Env, path: Path, program: Any) extends Walker {
  def doit(): List[SourceElement] = {
    walk(program).asInstanceOf[List[SourceElement]]
  }

  override def walk(node: Any): Any = node match {
    // TODO: Document
    case SProgram(_, STopLevel(_, _, stmts)) => walk(stmts)
    case SSourceElements(_, stmts, _) => walk(stmts)
    case SModExpFunDecl(_, fd) => fd
    case fd: FunDecl => fd
    case xs:List[_] => (new ModImpWalker(env, path, xs.map(walk _).filter(_ != null))).doit
    case _ => null
  }
}
